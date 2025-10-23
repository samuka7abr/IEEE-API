import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(eventId: string, createCommentDto: CreateCommentDto, userId: string) {
    // Verificar se o evento existe
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    // Se tiver parentId, verificar se o comentário pai existe
    if (createCommentDto.parentId) {
      const parentComment = await this.prisma.comment.findUnique({
        where: { id: createCommentDto.parentId },
      });

      if (!parentComment) {
        throw new NotFoundException('Comentário pai não encontrado');
      }
    }

    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        eventId,
        authorId: userId,
        parentId: createCommentDto.parentId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findAllByEvent(eventId: string) {
    return this.prisma.comment.findMany({
      where: {
        eventId,
        parentId: null, // Apenas comentários principais
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    // Verificar se o usuário é o autor
    if (comment.authorId !== userId) {
      throw new ForbiddenException('Você não pode editar este comentário');
    }

    return this.prisma.comment.update({
      where: { id },
      data: { content: updateCommentDto.content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    // Verificar se o usuário é o autor
    if (comment.authorId !== userId) {
      throw new ForbiddenException('Você não pode remover este comentário');
    }

    await this.prisma.comment.delete({
      where: { id },
    });

    return { message: 'Comentário removido com sucesso' };
  }
}
