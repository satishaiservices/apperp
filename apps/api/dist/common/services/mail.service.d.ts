export declare class MailService {
    private readonly logger;
    private transporter?;
    isConfigured(): boolean;
    private getTransporter;
    send(message: {
        to: string;
        subject: string;
        text: string;
    }): Promise<void>;
}
