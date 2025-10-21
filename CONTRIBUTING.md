# 🤝 Guia de Contribuição - IEEE API

Obrigado por considerar contribuir para o projeto IEEE API! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Começar](#como-começar)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Testes](#testes)
- [Documentação](#documentação)

## 📜 Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Demonstre empatia com outros membros

## 🚀 Como Começar

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU-USUARIO/IEEE-API.git
cd IEEE-API

# Adicione o repositório original como upstream
git remote add upstream https://github.com/samuka7abr/IEEE-API.git
```

### 2. Configure o Ambiente

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env conforme necessário

# Execute migrations
npm run prisma:migrate
npm run prisma:seed
```

### 3. Execute o Projeto

```bash
# Modo desenvolvimento
npm run start:dev

# Acesse: http://localhost:3000/api/docs
```

## 🔄 Fluxo de Desenvolvimento

### 1. Crie uma Branch

```bash
# Atualize seu repositório
git checkout main
git pull upstream main

# Crie uma nova branch
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-fix
```

**Padrões de nome de branch:**
- `feature/` - Para novas funcionalidades
- `fix/` - Para correção de bugs
- `docs/` - Para documentação
- `refactor/` - Para refatoração
- `test/` - Para adicionar testes
- `chore/` - Para tarefas de manutenção

### 2. Desenvolva

```bash
# Faça suas alterações
# Teste localmente
npm run start:dev

# Execute linting
npm run lint

# Execute testes
npm run test
```

### 3. Commit

```bash
# Adicione as mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: adiciona upload de imagens"
```

### 4. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nome-da-feature

# Abra um Pull Request no GitHub
```

## 💻 Padrões de Código

### Estrutura de Arquivos

```
src/modules/nome-do-modulo/
├── dto/
│   ├── create-nome.dto.ts
│   └── update-nome.dto.ts
├── entities/ (opcional)
│   └── nome.entity.ts
├── nome.controller.ts
├── nome.service.ts
├── nome.module.ts
└── nome.service.spec.ts
```

### Nomenclatura

**Classes:**
```typescript
// PascalCase
export class UserService {}
export class CreateEventDto {}
```

**Interfaces:**
```typescript
// PascalCase com 'I' prefix (opcional)
export interface IUserRepository {}
export interface UserProfile {}
```

**Funções e Variáveis:**
```typescript
// camelCase
const userName = 'João';
function getUserById(id: string) {}
```

**Constantes:**
```typescript
// UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5242880;
const JWT_SECRET = process.env.JWT_SECRET;
```

### DTOs (Data Transfer Objects)

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'joao@ieee.org' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Bio do usuário' })
  @IsOptional()
  @IsString()
  bio?: string;
}
```

### Controllers

```typescript
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### Services

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        // ... outros campos
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
```

### Tratamento de Erros

```typescript
import { 
  NotFoundException, 
  BadRequestException,
  ConflictException,
  UnauthorizedException 
} from '@nestjs/common';

// Use exceções apropriadas
if (!user) {
  throw new NotFoundException('Usuário não encontrado');
}

if (existingEmail) {
  throw new ConflictException('Email já cadastrado');
}

if (!validPassword) {
  throw new UnauthorizedException('Credenciais inválidas');
}
```

## 📝 Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Adicionar/modificar testes
- `chore`: Manutenção/tarefas

### Exemplos

```bash
feat: adiciona upload de imagens
fix: corrige validação de email
docs: atualiza README com exemplos
refactor: melhora performance de queries
test: adiciona testes para AuthService
chore: atualiza dependências
```

### Descrições Detalhadas

```bash
git commit -m "feat: adiciona sistema de comentários

- Implementa CRUD de comentários
- Adiciona suporte a respostas (nested comments)
- Valida autoria para edição/exclusão
- Adiciona testes unitários

Closes #42"
```

## 🔀 Pull Requests

### Checklist

Antes de abrir um PR, verifique:

- [ ] O código compila sem erros
- [ ] Todos os testes passam
- [ ] Código segue os padrões do projeto
- [ ] Documentação foi atualizada
- [ ] Commit messages seguem o padrão
- [ ] Branch está atualizada com main
- [ ] PR tem descrição clara

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Execute `npm install`
2. Execute `npm run start:dev`
3. Teste o endpoint X
4. Verifique Y

## Screenshots (se aplicável)
[Adicione screenshots]

## Checklist
- [ ] Código testado localmente
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Sem warnings de lint

## Issues Relacionadas
Closes #123
```

## 🧪 Testes

### Testes Unitários

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: '1', name: 'Test User' }];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);

      expect(await service.findAll()).toEqual(users);
    });
  });
});
```

### Executar Testes

```bash
# Todos os testes
npm run test

# Watch mode
npm run test:watch

# Cobertura
npm run test:cov

# E2E
npm run test:e2e
```

## 📚 Documentação

### Swagger/OpenAPI

Sempre documente seus endpoints:

```typescript
@Post()
@ApiOperation({ summary: 'Criar novo usuário' })
@ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
@ApiResponse({ status: 400, description: 'Dados inválidos' })
@ApiResponse({ status: 409, description: 'Email já cadastrado' })
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### Comentários no Código

```typescript
/**
 * Busca um usuário por ID
 * 
 * @param id - UUID do usuário
 * @returns Dados do usuário
 * @throws NotFoundException quando usuário não existe
 */
async findOne(id: string): Promise<User> {
  const user = await this.prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException('Usuário não encontrado');
  }

  return user;
}
```

### README e Documentação

- Atualize o README quando adicionar features importantes
- Adicione exemplos de uso no API-EXAMPLES.md
- Documente mudanças breaking no CHANGELOG.md

## 🐛 Reportando Bugs

### Template de Issue

```markdown
## Descrição do Bug
Descrição clara e concisa do bug

## Como Reproduzir
1. Vá para '...'
2. Execute '...'
3. Veja o erro

## Comportamento Esperado
O que deveria acontecer

## Comportamento Atual
O que está acontecendo

## Screenshots
Se aplicável

## Ambiente
- OS: [ex: Ubuntu 22.04]
- Node: [ex: 18.17.0]
- npm: [ex: 9.6.7]

## Informações Adicionais
Qualquer contexto adicional
```

## 💡 Sugerindo Features

### Template de Feature Request

```markdown
## Descrição da Feature
Descrição clara da funcionalidade

## Problema que Resolve
Qual problema esta feature resolve?

## Solução Proposta
Como você imagina que funcionaria?

## Alternativas Consideradas
Outras formas de resolver o problema

## Informações Adicionais
Contexto adicional, screenshots, etc.
```

## 📞 Comunicação

- **Issues**: Para bugs e feature requests
- **Discussions**: Para perguntas e discussões gerais
- **Pull Requests**: Para contribuições de código

## ✅ Revisão de Código

Ao revisar PRs, verifique:

1. **Funcionalidade**: O código faz o que promete?
2. **Testes**: Tem testes adequados?
3. **Documentação**: Está documentado?
4. **Padrões**: Segue os padrões do projeto?
5. **Performance**: Há problemas de performance?
6. **Segurança**: Há vulnerabilidades?

## 🎯 Áreas Prioritárias

Áreas que precisam de contribuição:

1. **EventsModule** - Implementação completa
2. **CommentsModule** - Implementação completa
3. **RegistrationsModule** - Implementação completa
4. **UploadsModule** - Implementação completa
5. **Testes** - Aumentar cobertura
6. **Documentação** - Sempre pode melhorar

Consulte [TODO.md](./TODO.md) para mais detalhes.

## 🙏 Agradecimentos

Obrigado por contribuir para tornar o IEEE API melhor! Sua contribuição, seja ela grande ou pequena, é muito valorizada.

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

---

**Dúvidas?** Abra uma issue ou discussion!
