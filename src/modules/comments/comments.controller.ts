import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('events/:eventId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar comentário em evento' })
  @ApiResponse({ status: 201, description: 'Comentário criado com sucesso' })
  create(
    @Param('eventId') eventId: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: any,
  ) {
    return this.commentsService.create(eventId, createCommentDto, user.id);
  }

  @Get('events/:eventId')
  @ApiOperation({ summary: 'Listar comentários de um evento' })
  findAllByEvent(@Param('eventId') eventId: string) {
    return this.commentsService.findAllByEvent(eventId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar comentário (apenas autor)' })
  @ApiResponse({ status: 200, description: 'Comentário atualizado' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: any,
  ) {
    return this.commentsService.update(id, updateCommentDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover comentário (apenas autor)' })
  @ApiResponse({ status: 200, description: 'Comentário removido' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.commentsService.remove(id, user.id);
  }
}
