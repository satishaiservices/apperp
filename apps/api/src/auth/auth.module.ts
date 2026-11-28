import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../common/services/mail.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { getAccessSecret, ACCESS_TOKEN_TTL_SECONDS } from './auth-tokens';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        // Throws at startup when JWT_SECRET is missing or shorter than 32 chars.
        secret: getAccessSecret(),
        signOptions: { expiresIn: ACCESS_TOKEN_TTL_SECONDS },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, MailService],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}