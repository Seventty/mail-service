import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SendEmailDto {
  @ApiProperty({ example: 'example@domain.com', description: 'Correo del destinatario' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 'Asunto del correo', description: 'Asunto del correo electrónico' })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Contenido del mensaje', description: 'Texto del mensaje' })
  @IsNotEmpty()
  text: string;
}

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar un correo electrónico' })
  @ApiResponse({ status: 200, description: 'Correo enviado exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error al enviar el correo.' })
  @ApiBody({ type: SendEmailDto, description: 'Datos del correo electrónico' })
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.emailService.sendEmail(
      sendEmailDto.to,
      sendEmailDto.subject,
      sendEmailDto.text
    );
  }
}
