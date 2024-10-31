import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'rainieryvalerio.example.com',  // Para enviar a través de Postfix en localhost
      port: 25,           // Puerto predeterminado de Postfix
      secure: false,      // No requiere TLS
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'elmastigeron2015@gmail.com',
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error enviando el correo:', error);
      throw error;
    }
  }
}
