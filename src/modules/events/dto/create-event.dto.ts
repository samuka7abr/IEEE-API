import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsEnum, IsNumber, MinLength } from 'class-validator';
import { EventStatus } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty({ example: 'Workshop de Inteligência Artificial' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Descrição completa do evento com HTML' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional({ example: 'Workshop intensivo sobre IA' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'https://example.com/banner.jpg' })
  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @ApiProperty({ example: '2025-12-01T09:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2025-12-01T17:00:00Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'Auditório Principal - Campus' })
  @IsString()
  location: string;

  @ApiProperty({ example: 'Workshop' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @ApiPropertyOptional({ example: '2025-11-25T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  registrationDeadline?: string;

  @ApiPropertyOptional({ enum: EventStatus, example: EventStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
