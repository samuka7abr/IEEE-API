import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('registrations')
@Controller('registrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('events/:eventId')
  @ApiOperation({ summary: 'Inscrever-se em evento' })
  @ApiResponse({ status: 201, description: 'Inscrição realizada com sucesso' })
  @ApiResponse({ status: 409, description: 'Já inscrito neste evento' })
  create(
    @Param('eventId') eventId: string,
    @Body() createRegistrationDto: CreateRegistrationDto,
    @CurrentUser() user: any,
  ) {
    return this.registrationsService.create(eventId, createRegistrationDto, user.id);
  }

  @Get('events/:eventId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar inscrições de um evento (Admin)' })
  findAllByEvent(@Param('eventId') eventId: string) {
    return this.registrationsService.findAllByEvent(eventId);
  }

  @Get('my-registrations')
  @ApiOperation({ summary: 'Listar minhas inscrições' })
  findMyRegistrations(@CurrentUser() user: any) {
    return this.registrationsService.findMyRegistrations(user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar inscrição' })
  @ApiResponse({ status: 200, description: 'Inscrição cancelada' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.registrationsService.remove(id, user.id);
  }
}
