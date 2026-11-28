import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

/**
 * Minimal SMTP sender. Configure with SMTP_HOST, SMTP_PORT (default 465),
 * SMTP_USER, SMTP_PASS and SMTP_FROM (e.g. a cPanel mailbox). When SMTP_HOST is
 * not set, isConfigured() is false and email-based flows are disabled.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter?: Transporter;

  isConfigured(): boolean {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM);
  }

  private getTransporter(): Transporter {
    if (!this.transporter) {
      const port = Number(process.env.SMTP_PORT ?? 465);
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      });
    }
    return this.transporter;
  }

  async send(message: { to: string; subject: string; text: string }) {
    if (!this.isConfigured()) {
      throw new Error('SMTP is not configured');
    }
    await this.getTransporter().sendMail({
      from: process.env.SMTP_FROM,
      ...message,
    });
    this.logger.log(`Sent "${message.subject}" email`);
  }
}
