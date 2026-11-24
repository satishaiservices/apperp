import { jest } from '@jest/globals';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwt: JwtService;

  beforeEach(() => {
    jwt = {
      verifyAsync: jest.fn(),
    } as unknown as JwtService;
    guard = new JwtAuthGuard(jwt);
  });

  const createMockContext = (headers: Record<string, string>, query?: Record<string, string>): ExecutionContext => {
    const request = {
      headers,
      query: query || {},
      user: null,
    };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  it('authenticates successfully via Bearer token', async () => {
    (jwt.verifyAsync as jest.Mock).mockResolvedValue({
      sub: 'user-1',
      tenantId: 'tenant-1',
      membershipId: 'mem-1',
      roles: ['SUPERVISOR'],
    });

    const ctx = createMockContext({ authorization: 'Bearer valid.jwt.token' });
    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
    const req = ctx.switchToHttp().getRequest();
    expect(req.user).toEqual({
      sub: 'user-1',
      tenantId: 'tenant-1',
      membershipId: 'mem-1',
      roles: ['SUPERVISOR'],
    });
  });

  it('authenticates successfully via ?token= query parameter', async () => {
    (jwt.verifyAsync as jest.Mock).mockResolvedValue({
      sub: 'user-1',
      tenantId: 'tenant-1',
      membershipId: 'mem-1',
      roles: ['SUPERVISOR'],
    });

    const verifySpy = jest.spyOn(jwt, 'verifyAsync');
    const ctx = createMockContext({}, { token: 'valid.query.jwt.token' });
    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
    expect(verifySpy).toHaveBeenCalledWith('valid.query.jwt.token');
    const req = ctx.switchToHttp().getRequest();
    expect(req.user.sub).toBe('user-1');
  });

  it('throws UnauthorizedException when neither header nor query token is provided', async () => {
    const ctx = createMockContext({});
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });

  it('throws UnauthorizedException when token is expired or invalid', async () => {
    (jwt.verifyAsync as jest.Mock).mockRejectedValue(new Error('jwt expired'));
    const ctx = createMockContext({ authorization: 'Bearer expired.token' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });
});
