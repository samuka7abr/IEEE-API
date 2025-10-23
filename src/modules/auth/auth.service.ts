import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Verificar se o e-mail já existe
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado');
    }

    // Verificar se a matrícula IEEE já existe
    const existingIeeeNumber = await this.usersService.findByIeeeNumber(registerDto.ieeeNumber);
    if (existingIeeeNumber) {
      throw new ConflictException('Matrícula IEEE já cadastrada');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Criar usuário
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Enviar e-mail de boas-vindas
    await this.mailService.sendWelcomeEmail(user.email, user.name);

    // Retornar token
    return this.login(user);
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Por segurança, não revelar se o e-mail existe
      return { message: 'Se o e-mail existir, você receberá instruções para redefinir a senha' };
    }

    // Gerar token de reset
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    await this.usersService.setResetToken(user.id, resetToken, resetTokenExpiry);

    // Enviar e-mail com link de reset
    await this.mailService.sendPasswordResetEmail(user.email, user.name, resetToken);

    return { message: 'Se o e-mail existir, você receberá instruções para redefinir a senha' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetToken(token);

    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.resetPassword(user.id, hashedPassword);

    return { message: 'Senha redefinida com sucesso' };
  }
}
