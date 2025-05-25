import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { loginOtpTemplate } from './templates/login-otp';
@Injectable()
export class EmailService {

    private resend: Resend;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('RESEND_API_KEY');
        this.resend = new Resend(apiKey);
    }

    //
    private async sendEmail(to: string, subject: string, template: string) {
        try {
            await this.resend.emails.send({
                from: 'onboarding@resend.dev',
                to,
                subject,
                html: template,
            });

        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }


    async sendEmailLogin(to: string, code: string) {
        const template = loginOtpTemplate(code); 
        await this.sendEmail(to, 'Login OTP', template);
        
    }
}
