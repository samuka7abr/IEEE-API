# 📚 Documentação da API - IEEE Backend

## Estrutura do Projeto

```
ieee-api/
├── prisma/
│   ├── schema.prisma        # Schema do banco de dados
│   ├── seed.ts              # Dados iniciais
│   └── migrations/          # Histórico de migrations
├── src/
│   ├── common/              # Código compartilhado
│   │   ├── decorators/      # Decorators customizados
│   │   ├── filters/         # Filtros de exceção
│   │   ├── guards/          # Guards de autorização
│   │   └── interceptors/    # Interceptors HTTP
│   ├── config/              # Configurações
│   ├── modules/
│   │   ├── auth/            # Autenticação e autorização
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   ├── guards/      # Guards do módulo
│   │   │   ├── strategies/  # Estratégias Passport
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/           # Gerenciamento de usuários
│   │   ├── events/          # Gerenciamento de eventos
│   │   ├── comments/        # Sistema de comentários
│   │   ├── registrations/   # Inscrições em eventos
│   │   ├── uploads/         # Upload de arquivos
│   │   └── mail/            # Envio de e-mails
│   ├── prisma/              # Módulo Prisma
│   ├── app.module.ts        # Módulo principal
│   └── main.ts              # Entry point
├── test/                    # Testes
├── uploads/                 # Arquivos enviados
├── .env                     # Variáveis de ambiente (não commitado)
├── .env.example             # Exemplo de variáveis
├── docker-compose.yml       # Configuração Docker
├── Dockerfile               # Imagem Docker
├── package.json
└── tsconfig.json
```

## 📋 Módulos da Aplicação

### 1. Auth Module (Autenticação)

**Endpoints:**

- `POST /auth/register` - Cadastrar novo usuário
- `POST /auth/login` - Login
- `POST /auth/request-password-reset` - Solicitar reset de senha
- `POST /auth/reset-password` - Redefinir senha

**Funcionalidades:**
- ✅ Cadastro com validação de matrícula IEEE
- ✅ Login com JWT
- ✅ Recuperação de senha por e-mail
- ✅ Validação de senha forte
- ✅ Criptografia com bcrypt

### 2. Users Module (Usuários)

**Endpoints:**

- `GET /users` - Listar usuários (Admin)
- `GET /users/me` - Ver próprio perfil
- `GET /users/:id` - Ver perfil de usuário
- `PATCH /users/me` - Atualizar próprio perfil
- `PATCH /users/:id` - Atualizar usuário (Admin)
- `DELETE /users/:id` - Remover usuário (Admin)

**Funcionalidades:**
- ✅ Perfil editável (nome, bio, avatar)
- ✅ Controle de acesso por roles
- ✅ Verificação de matrícula IEEE

### 3. Events Module (Eventos)

**Endpoints:**

- `GET /events` - Listar eventos (com filtros e busca)
- `GET /events/:id` - Ver evento específico
- `POST /events` - Criar evento (Admin)
- `PATCH /events/:id` - Atualizar evento (Admin)
- `DELETE /events/:id` - Remover evento (Admin)

**Funcionalidades:**
- ✅ CRUD completo de eventos
- ✅ Upload de banner e galeria
- ✅ Sistema de slug para URLs amigáveis
- ✅ Filtros por categoria, data, status
- ✅ Busca por título/descrição
- ✅ Paginação

**Status de Eventos:**
- `DRAFT` - Rascunho
- `PUBLISHED` - Publicado
- `CANCELLED` - Cancelado
- `COMPLETED` - Concluído

### 4. Comments Module (Comentários)

**Endpoints:**

- `GET /events/:eventId/comments` - Listar comentários
- `POST /events/:eventId/comments` - Criar comentário
- `PATCH /comments/:id` - Editar comentário (próprio)
- `DELETE /comments/:id` - Remover comentário (próprio)

**Funcionalidades:**
- ✅ Comentários em eventos
- ✅ Edição/exclusão apenas do próprio comentário
- ✅ Sistema de respostas (nested comments)
- ✅ Validação de conteúdo

### 5. Registrations Module (Inscrições)

**Endpoints:**

- `POST /events/:eventId/register` - Inscrever-se em evento
- `GET /events/:eventId/registrations` - Ver inscrições (Admin)
- `GET /my-registrations` - Ver minhas inscrições
- `DELETE /registrations/:id` - Cancelar inscrição

**Funcionalidades:**
- ✅ Formulário de inscrição customizável
- ✅ Notificação para admins
- ✅ E-mail de confirmação
- ✅ Limite de participantes
- ✅ Prazo de inscrição
- ✅ Status de inscrição (confirmada, cancelada, compareceu)

### 6. Uploads Module (Uploads)

**Endpoints:**

- `POST /uploads/image` - Upload de imagem
- `DELETE /uploads/:filename` - Remover arquivo (Admin)

**Funcionalidades:**
- ✅ Upload de imagens (JPG, PNG, WebP)
- ✅ Validação de tamanho (max 5MB)
- ✅ Geração de nome único
- ✅ Armazenamento local
- ✅ Suporte para avatar e banners

### 7. Mail Module (E-mails)

**Funcionalidades:**
- ✅ E-mail de boas-vindas
- ✅ E-mail de recuperação de senha
- ✅ Notificação de inscrição (admin)
- ✅ Confirmação de inscrição (usuário)
- ✅ Templates HTML personalizados

## 🔐 Segurança e LGPD

### Implementações de Segurança:

1. **Autenticação**
   - JWT com expiração configurável
   - Refresh tokens (pode ser implementado)
   - Senhas criptografadas com bcrypt

2. **Autorização**
   - Role-Based Access Control (RBAC)
   - Guards customizados
   - Proteção de rotas administrativas

3. **Rate Limiting**
   - Throttler para prevenir abuso
   - Configurável por rota

4. **Validação**
   - Class-validator em todos os DTOs
   - Sanitização de inputs
   - Validação de tipos

5. **LGPD Compliance**
   - Logs de auditoria
   - Controle de acesso a dados
   - Possibilidade de exportação de dados
   - Possibilidade de exclusão de conta

6. **Logs de Auditoria**
   - Registro de login/logout
   - Registro de criação/edição de eventos
   - Registro de ações administrativas
   - IP e User-Agent

## 🗄️ Modelo de Dados

### User
```typescript
{
  id: string (UUID)
  email: string (unique)
  password: string (hashed)
  name: string
  ieeeNumber: string (unique)
  isVerified: boolean
  role: Role (USER | ADMIN)
  bio?: string
  avatarUrl?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Event
```typescript
{
  id: string (UUID)
  title: string
  slug: string (unique)
  description: string (HTML)
  shortDescription?: string
  bannerUrl?: string
  startDate: Date
  endDate?: Date
  location: string
  category: string
  maxParticipants?: number
  registrationDeadline?: Date
  status: EventStatus
  createdById: string
  createdAt: Date
  updatedAt: Date
}
```

### Comment
```typescript
{
  id: string (UUID)
  content: string
  authorId: string
  eventId: string
  parentId?: string (para respostas)
  createdAt: Date
  updatedAt: Date
}
```

### EventRegistration
```typescript
{
  id: string (UUID)
  userId: string
  eventId: string
  additionalInfo?: JSON (campos customizados)
  status: string (confirmed | cancelled | attended)
  createdAt: Date
  updatedAt: Date
}
```

## 🎨 Padrões de Código

### DTOs (Data Transfer Objects)
- Validação com class-validator
- Documentação com Swagger
- Transformação automática

### Services
- Lógica de negócio
- Acesso ao banco via Prisma
- Tratamento de erros

### Controllers
- Rotas RESTful
- Guards de autenticação
- Documentação Swagger

### Guards
- JwtAuthGuard - Valida JWT
- RolesGuard - Valida roles
- LocalAuthGuard - Login local

## 🧪 Testes

### Estrutura de Testes
```bash
test/
├── unit/              # Testes unitários
├── integration/       # Testes de integração
└── e2e/               # Testes end-to-end
```

### Executar Testes
```bash
npm run test           # Unitários
npm run test:e2e       # E2E
npm run test:cov       # Com cobertura
```

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
NODE_ENV=production
DATABASE_URL=<url-producao>
JWT_SECRET=<chave-super-segura>
CORS_ORIGIN=<url-frontend>
```

### Checklist de Deploy

- [ ] Configurar banco de dados de produção
- [ ] Executar migrations
- [ ] Configurar variáveis de ambiente
- [ ] Configurar CORS
- [ ] Ativar HTTPS
- [ ] Configurar backup do banco
- [ ] Configurar logs
- [ ] Configurar monitoramento

## 📊 Performance

### Otimizações Implementadas

1. **Índices no Banco**
   - Índices em campos de busca frequente
   - Índices compostos quando necessário

2. **Queries Otimizadas**
   - Select apenas campos necessários
   - Uso de includes apenas quando preciso
   - Paginação em listagens

3. **Caching** (pode ser implementado)
   - Redis para sessões
   - Cache de queries frequentes

## 🔄 Roadmap de Melhorias

### Futuras Implementações

- [ ] Sistema de notificações em tempo real (WebSockets)
- [ ] Upload para cloud storage (AWS S3/Azure Blob)
- [ ] Sistema de tags para eventos
- [ ] Feed de atividades
- [ ] Dashboard analítico
- [ ] Exportação de relatórios
- [ ] Sistema de favoritos
- [ ] Chat nos eventos
- [ ] Certificados automáticos
- [ ] Integração com calendário
- [ ] QR Code para check-in

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação Swagger
- Entre em contato com a equipe IEEE
