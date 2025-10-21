import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty({ example: 'joao.silva@ieee.org' })
  @IsEmail()
  email: string;
}
