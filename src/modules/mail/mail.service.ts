import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: email,
        subject: 'Bem-vindo ao IEEE!',
        html: `
          <h1>Olá ${name}!</h1>
          <p>Seja bem-vindo ao sistema de eventos do IEEE.</p>
          <p>Você já pode explorar nossos eventos e se inscrever.</p>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail de boas-vindas:', error);
    }
  }

  async sendPasswordResetEmail(email: string, name: string, token: string) {
    const resetUrl = `${this.configService.get('CORS_ORIGIN')}/reset-password?token=${token}`;
    
    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: email,
        subject: 'Recuperação de Senha - IEEE',
        html: `
          <h1>Olá ${name}!</h1>
          <p>Você solicitou a recuperação de senha.</p>
          <p>Clique no link abaixo para criar uma nova senha:</p>
          <a href="${resetUrl}">Redefinir Senha</a>
          <p>Este link é válido por 1 hora.</p>
          <p>Se você não solicitou esta alteração, ignore este e-mail.</p>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
    }
  }

  async sendEventRegistrationNotification(adminEmails: string[], eventTitle: string, userName: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: adminEmails.join(','),
        subject: `Nova inscrição no evento: ${eventTitle}`,
        html: `
          <h1>Nova Inscrição</h1>
          <p><strong>${userName}</strong> se inscreveu no evento <strong>${eventTitle}</strong>.</p>
          <p>Acesse o painel administrativo para gerenciar as inscrições.</p>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar notificação de inscrição:', error);
    }
  }

  async sendEventConfirmationEmail(email: string, userName: string, eventTitle: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: email,
        subject: `Confirmação de Inscrição - ${eventTitle}`,
        html: `
          <h1>Inscrição Confirmada!</h1>
          <p>Olá ${userName},</p>
          <p>Sua inscrição no evento <strong>${eventTitle}</strong> foi confirmada com sucesso.</p>
          <p>Aguardamos você!</p>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail de confirmação:', error);
    }
  }
}
