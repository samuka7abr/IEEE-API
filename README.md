# IEEE API - Sistema de Gerenciamento de Eventos

Backend desenvolvido em NestJS com Prisma ORM para o site do IEEE, funcionando como um blog de eventos com sistema de cadastro, autenticação e gerenciamento de conteúdo.

## 🚀 Funcionalidades

### Autenticação e Usuários
- ✅ Cadastro de usuários com validação de matrícula IEEE
- ✅ Login e logout com JWT
- ✅ Recuperação de senha por e-mail
- ✅ Perfil de usuário editável (foto, bio)
- ✅ Controle de acesso baseado em roles (Admin/User)

### Eventos
- ✅ Listagem de eventos (estilo blog)
- ✅ Página detalhada de cada evento
- ✅ Galeria de fotos por evento
- ✅ CRUD completo para administradores
- ✅ Upload de imagens (banner e galeria)
- ✅ Busca e filtros (título, data, categoria)

### Comentários
- ✅ Sistema de comentários nos eventos
- ✅ Edição e exclusão dos próprios comentários

### Inscrições
- ✅ Formulário de inscrição em eventos
- ✅ Notificações para administradores
- ✅ Painel de gerenciamento de inscrições

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **Prisma ORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Nodemailer** - Envio de e-mails
- **Swagger** - Documentação da API
- **Class Validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/samuka7abr/IEEE-API.git
cd IEEE-API
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

4. Execute as migrations do Prisma:
```bash
npm run prisma:migrate
```

5. (Opcional) Execute o seed para popular o banco:
```bash
npm run prisma:seed
```

6. Inicie o servidor:
```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api/docs
```

## 🗂️ Estrutura do Projeto

```
src/
├── common/              # Utilitários, decorators, guards, etc.
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/              # Configurações da aplicação
├── modules/
│   ├── auth/           # Autenticação e autorização
│   ├── users/          # Gerenciamento de usuários
│   ├── events/         # Gerenciamento de eventos
│   ├── comments/       # Sistema de comentários
│   ├── registrations/  # Inscrições em eventos
│   ├── uploads/        # Upload de arquivos
│   └── mail/           # Envio de e-mails
├── prisma/             # Schema e migrations
└── main.ts             # Entry point
```

## 🔐 Segurança (LGPD Compliance)

- Senhas criptografadas com bcrypt
- Tokens JWT com expiração
- Rate limiting para prevenir ataques
- Validação de dados em todas as rotas
- Logs de auditoria (login, criação de eventos)
- Proteção de rotas administrativas

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm run test
npm run test:e2e
npm run test:cov

# Prisma
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
npm run prisma:seed

# Linting
npm run lint
npm run format
```

## 🐳 Docker

```bash
# Build
docker build -t ieee-api .

# Run
docker run -p 3000:3000 ieee-api
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para ieee@example.com ou abra uma issue no GitHub.
