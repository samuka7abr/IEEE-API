import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsObject } from 'class-validator';

export class CreateRegistrationDto {
  @ApiPropertyOptional({
    example: {
      telefone: '11999999999',
      dietaRestritiva: 'Vegetariano',
      observacoes: 'Preciso de certificado',
    },
  })
  @IsOptional()
  @IsObject()
  additionalInfo?: Record<string, any>;
}
