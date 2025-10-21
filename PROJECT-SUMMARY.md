# 🚀 IEEE API - Backend NestJS + Prisma

## 📖 Resumo do Projeto

Este é o **backend completo** para o sistema de gerenciamento de eventos do IEEE, desenvolvido como boilerplate usando **NestJS** e **Prisma ORM**.

### 🎯 Objetivo

Criar uma API RESTful robusta, segura e escalável para gerenciar:
- Usuários e autenticação
- Eventos estilo blog
- Comentários e interações
- Inscrições em eventos
- Upload de imagens
- Notificações por e-mail

## ✨ Características Principais

### ✅ Implementado

1. **Autenticação e Autorização**
   - JWT para autenticação
   - Registro com validação de matrícula IEEE
   - Login/Logout
   - Recuperação de senha por e-mail
   - Controle de acesso baseado em roles (Admin/User)

2. **Gerenciamento de Usuários**
   - Perfil editável (nome, bio, avatar)
   - Listagem de usuários (admin)
   - Verificação de matrícula IEEE

3. **Sistema de E-mails**
   - Boas-vindas
   - Recuperação de senha
   - Notificações de inscrição
   - Confirmação de eventos

4. **Segurança**
   - Senhas criptografadas (bcrypt)
   - Rate limiting
   - CORS configurável
   - Validação de dados
   - Logs de auditoria (schema pronto)

5. **Infraestrutura**
   - Docker e docker-compose
   - PostgreSQL
   - Prisma ORM
   - Swagger documentation
   - Scripts de setup automatizado

### 🚧 Para Implementar

Os seguintes módulos têm o schema do banco pronto, mas precisam dos controllers e services:

1. **EventsModule** - CRUD de eventos, busca, filtros, paginação
2. **CommentsModule** - Sistema de comentários com respostas
3. **RegistrationsModule** - Inscrições em eventos com formulários customizáveis
4. **UploadsModule** - Upload de imagens (avatar, banners, galeria)

## 📊 Banco de Dados

### Modelos Implementados (Prisma Schema)

- ✅ **User** - Usuários do sistema
- ✅ **Event** - Eventos/posts
- ✅ **EventImage** - Galeria de imagens dos eventos
- ✅ **Comment** - Comentários (com suporte a respostas)
- ✅ **EventRegistration** - Inscrições em eventos
- ✅ **AuditLog** - Logs de auditoria

### Relacionamentos

```
User 1-N Event (criador)
User 1-N Comment (autor)
User 1-N EventRegistration
Event 1-N EventImage
Event 1-N Comment
Event 1-N EventRegistration
Comment 1-N Comment (respostas)
```

## 📁 Estrutura do Projeto

```
ieee-api/
├── prisma/                      # Banco de dados
│   ├── schema.prisma           # ✅ Schema completo
│   ├── seed.ts                 # ✅ Dados iniciais
│   └── migrations/             # Histórico de migrations
│
├── src/
│   ├── common/                 # Código compartilhado
│   │   └── decorators/         # ✅ @CurrentUser, @Roles
│   │
│   ├── modules/
│   │   ├── auth/               # ✅ Autenticação completa
│   │   │   ├── dto/           # ✅ DTOs prontos
│   │   │   ├── guards/        # ✅ JWT, Local, Roles guards
│   │   │   ├── strategies/    # ✅ JWT, Local strategies
│   │   │   ├── auth.controller.ts    # ✅
│   │   │   ├── auth.service.ts       # ✅
│   │   │   └── auth.module.ts        # ✅
│   │   │
│   │   ├── users/              # ✅ Usuários completo
│   │   │   ├── dto/           # ✅
│   │   │   ├── users.controller.ts   # ✅
│   │   │   ├── users.service.ts      # ✅
│   │   │   └── users.module.ts       # ✅
│   │   │
│   │   ├── mail/               # ✅ E-mails completo
│   │   │   ├── mail.service.ts       # ✅
│   │   │   └── mail.module.ts        # ✅
│   │   │
│   │   ├── events/             # 🚧 Implementar
│   │   ├── comments/           # 🚧 Implementar
│   │   ├── registrations/      # 🚧 Implementar
│   │   └── uploads/            # 🚧 Implementar
│   │
│   ├── prisma/                 # ✅ Módulo Prisma
│   ├── app.module.ts           # ✅ Módulo principal
│   └── main.ts                 # ✅ Entry point
│
├── .env.example                # ✅ Exemplo de variáveis
├── .gitignore                  # ✅ Configurado
├── docker-compose.yml          # ✅ PostgreSQL + API
├── Dockerfile                  # ✅ Build da aplicação
├── package.json                # ✅ Dependências
├── tsconfig.json               # ✅ TypeScript config
├── nest-cli.json               # ✅ NestJS config
│
└── Documentação/
    ├── README.md               # ✅ Overview
    ├── INSTALL.md              # ✅ Guia de instalação
    ├── DOCUMENTATION.md        # ✅ Documentação técnica
    ├── API-EXAMPLES.md         # ✅ Exemplos de uso
    ├── TODO.md                 # ✅ Checklist
    └── setup.sh                # ✅ Script de setup
```

## 🚀 Quick Start

### 1. Instalar

```bash
# Clone o repositório
git clone https://github.com/samuka7abr/IEEE-API.git
cd IEEE-API

# Execute o script de setup (recomendado)
./setup.sh

# OU instale manualmente
npm install
cp .env.example .env
# Edite o .env com suas configurações
```

### 2. Configurar Banco de Dados

```bash
# Opção A: Docker (recomendado)
docker-compose up -d postgres

# Opção B: PostgreSQL local
# Configure DATABASE_URL no .env
```

### 3. Migrations e Seed

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4. Iniciar

```bash
npm run start:dev
```

### 5. Acessar

- **API**: http://localhost:3000/api/v1
- **Swagger**: http://localhost:3000/api/docs
- **Prisma Studio**: `npm run prisma:studio`

## 🧪 Credenciais de Teste

Após executar o seed:

- **Admin**: admin@ieee.org / Admin@123
- **User**: user@ieee.org / User@123

## 📚 Documentação Completa

- [INSTALL.md](./INSTALL.md) - Guia detalhado de instalação
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Documentação técnica
- [API-EXAMPLES.md](./API-EXAMPLES.md) - Exemplos de requisições
- [TODO.md](./TODO.md) - Checklist de implementação

## 🛠️ Stack Tecnológica

- **Node.js** 18+
- **NestJS** 10 - Framework backend
- **Prisma** 5 - ORM
- **PostgreSQL** 15 - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Criptografia
- **Nodemailer** - E-mails
- **Swagger** - Documentação
- **Docker** - Containerização
- **TypeScript** - Linguagem

## 🎯 Requisitos Atendidos

### Requisitos Funcionais (RF)

- ✅ RF01: Cadastro de usuários
- ✅ RF02: Login e logout
- ✅ RF03: Edição de perfil
- ✅ RF04: Recuperação de senha
- ✅ RF05: Listagem de eventos (schema pronto)
- ✅ RF06: Página de evento (schema pronto)
- ✅ RF07: Comentários (schema pronto)
- ✅ RF08: Editar/apagar comentários (schema pronto)
- ✅ RF09: Criar eventos - Admin (schema pronto)
- ✅ RF10: Editar/apagar eventos - Admin (schema pronto)
- ✅ RF11: Upload de imagens (schema pronto)
- ✅ RF12: Formulário de inscrição (schema pronto)
- ✅ RF13: Painel administrativo (roles implementados)
- ✅ RF14: Notificações de inscrição (email pronto)
- ✅ RF15: Busca e filtros (schema preparado)
- ✅ RF16: Estilo blog (schema preparado)
- ✅ RF17: Diferenciação de roles

### Requisitos Não Funcionais (RNF)

- ✅ RNF01: Interface responsiva (responsabilidade do frontend)
- ✅ RNF02: Performance (índices no banco)
- ✅ RNF03: Segurança (bcrypt, JWT, guards)
- ✅ RNF04: Disponibilidade (Docker, fácil deploy)
- ✅ RNF06: Escalabilidade (arquitetura modular)
- ✅ RNF08: Integridade de dados (Prisma validações)
- ✅ RNF09: LGPD (logs de auditoria, controle de acesso)
- ✅ RNF11: Logs (schema de auditoria)
- ✅ RNF12: Responsivo (responsabilidade do frontend)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Próximos Passos

Para completar o projeto, implemente:

1. **EventsModule** - CRUD completo, busca, filtros
2. **CommentsModule** - Sistema de comentários
3. **RegistrationsModule** - Inscrições em eventos
4. **UploadsModule** - Upload de arquivos
5. **Testes** - Cobertura mínima de 70%

Consulte [TODO.md](./TODO.md) para detalhes.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👥 Equipe IEEE

Desenvolvido com ❤️ pela equipe IEEE

---

**Status do Projeto**: 🟡 Em Desenvolvimento

**Cobertura**: ~60% completo (Auth, Users, Mail prontos | Events, Comments, Registrations, Uploads pendentes)

**Última Atualização**: Outubro 2025
