import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Ótimo evento! Mal posso esperar!' })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiPropertyOptional({ example: 'uuid-do-comentario-pai' })
  @IsOptional()
  @IsString()
  parentId?: string;
}
