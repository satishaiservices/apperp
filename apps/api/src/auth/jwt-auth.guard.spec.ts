import { jest } from '@jest/globals';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { PrismaService } from '../database/prisma.service';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwt: JwtService;
  let userRow: { status: string; tokenVersion: number; isPlatformAdmin: boolean } | null;
  let membershipRow: { id: string } | null;

  const accessClaims = {
    sub: 'user-1',
    tenantId: 'tenant-1',
    membershipId: 'mem-1',
    roles: ['SUPERVISOR'],
    isPlatformAdmin: false,
    tokenType: 'access',
    tv: 0,
  };

  beforeEach(() => {
    JwtAuthGuard.invalidateUser('user-1');
    userRow = { status: 'ACTIVE', tokenVersion: 0, isPlatformAdmin: false };
    membershipRow = { id: 'mem-1' };
    jwt = { verifyAsync: jest.fn() } as unknown as JwtService;
    const prisma = {
      user: { findUnique: jest.fn(async () => userRow) },
      tenantMembership: { findFirst: jest.fn(async () => membershipRow) },
    } as unknown as PrismaService;
    guard = new JwtAuthGuard(jwt, prisma);
  });

  const ctxWith = (headers: Record<string, string>, query: Record<string, string> = {}) => {
    const request = { headers, query, user: null };
    return {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
  };

  it('accepts a valid access token from the Authorization header', async () => {
    (jwt.verifyAsync as jest.Mock).mockResolvedValue(accessClaims as never);
    const ctx = ctxWith({ authorization: 'Bearer valid.jwt.token' });

    await expect(guard.canActivate(ctx)).resolves.toBe(true);
    expect(ctx.switchToHttp().getRequest().user).toEqual({
      sub: 'user-1',
      tenantId: 'tenant-1',
      membershipId: 'mem-1',
      roles: ['SUPERVISOR'],
      isPlatformAdmin: false,
    });
  });

  it('rejects tokens passed in the query string', async () => {
    (jwt.verifyAsync as jest.Mock).mockResolvedValue(accessClaims as never);
    await expect(guard.canActivate(ctxWith({}, { token: 'valid.jwt.token' }))).rejects.toThrow(
      UnauthorizedException,
    );
    expect(jwt.verifyAsync).not.toHaveBeenCalled();
  });

  it('rejects a refresh token used as an access token', async () => {
    (jwt.verifyAsync as jest.Mock).mockResolvedValue({ ...accessClaims, tokenType: 'refresh' } as never);
    await expect(guard.canActivate(ctxWith({ authorization: 'Bearer r.t' }))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects legacy tokens without a token type', async () => {
    const { tokenType: _t, tv: _v, ...legacy } = accessClaims;
    (jwt.verifyAsync as jest.Mock).mockResolvedValue(legacy as never);
    await expect(guard.canActivate(ctxWith({ authorization: 'Bearer l.t' }))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects revoked tokens (token version changed)', async () => {
    userRow = { status: 'ACTIVE', tokenVersion: 1, isPlatformAdmin: false };
    (jwt.verifyAsync as jest.Mock).mockResolvedValue(accessClaims as never);
    await expect(guard.canActivate(ctxWith({ authorization: 'Bearer a.t' }))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects deactivated users and inactive memberships', async () => {
    (jwt.verifyAsync as jest.Mock).mockResolvedValue(accessClaims as never);

    userRow = { status: 'INACTIVE', tokenVersion: 0, isPlatformAdmin: false };
    await expect(guard.canActivate(ctxWith({ authorization: 'Bearer a.t' }))).rejects.toThrow(
      UnauthorizedException,
    );

    userRow = { status: 'ACTIVE', tokenVersion: 0, isPlatformAdmin: false };
    membershipRow = null;
    await expect(guard.canActivate(ctxWith({ authorization: 'Bearer a.t' }))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('throws when no token is provided', async () => {
    await expect(guard.canActivate(ctxWith({}))).rejects.toThrow(UnauthorizedException);
  });
});
