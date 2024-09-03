import nodemailer, { Transporter } from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../config/envs';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  public async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: ' + info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}

export const mailService = new MailService();
