# 📌 Exemplos de Requisições - IEEE API

## 🔐 Autenticação

### Registrar Novo Usuário
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao.silva@ieee.org",
  "password": "Senha@123",
  "ieeeNumber": "87654321"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "joao.silva@ieee.org",
    "name": "João Silva",
    "role": "USER",
    "avatarUrl": null
  }
}
```

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@ieee.org",
  "password": "Admin@123"
}
```

### Solicitar Reset de Senha
```http
POST /api/v1/auth/request-password-reset
Content-Type: application/json

{
  "email": "joao.silva@ieee.org"
}
```

### Redefinir Senha
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "token-recebido-por-email",
  "password": "NovaSenha@123"
}
```

## 👤 Usuários

### Ver Próprio Perfil
```http
GET /api/v1/users/me
Authorization: Bearer {token}
```

### Atualizar Próprio Perfil
```http
PATCH /api/v1/users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "bio": "Estudante de engenharia apaixonado por tecnologia",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

### Listar Todos os Usuários (Admin)
```http
GET /api/v1/users
Authorization: Bearer {admin-token}
```

### Ver Usuário Específico
```http
GET /api/v1/users/{userId}
Authorization: Bearer {token}
```

## 📅 Eventos

### Listar Eventos (Público)
```http
GET /api/v1/events
```

### Listar Eventos com Filtros
```http
GET /api/v1/events?category=Workshop&status=PUBLISHED&page=1&limit=10
```

### Buscar Eventos
```http
GET /api/v1/events?search=inteligencia+artificial
```

### Ver Evento Específico
```http
GET /api/v1/events/{eventId}
```

### Criar Evento (Admin)
```http
POST /api/v1/events
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "title": "Workshop de Machine Learning",
  "description": "<p>Aprenda os fundamentos de ML...</p>",
  "shortDescription": "Workshop prático de ML",
  "bannerUrl": "https://example.com/banner.jpg",
  "startDate": "2025-12-01T09:00:00Z",
  "endDate": "2025-12-01T17:00:00Z",
  "location": "Sala 101 - Bloco A",
  "category": "Workshop",
  "maxParticipants": 50,
  "registrationDeadline": "2025-11-25T23:59:59Z",
  "status": "PUBLISHED"
}
```

### Atualizar Evento (Admin)
```http
PATCH /api/v1/events/{eventId}
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "title": "Workshop de Machine Learning - Atualizado",
  "maxParticipants": 60
}
```

### Deletar Evento (Admin)
```http
DELETE /api/v1/events/{eventId}
Authorization: Bearer {admin-token}
```

## 💬 Comentários

### Listar Comentários de um Evento
```http
GET /api/v1/events/{eventId}/comments
```

### Criar Comentário
```http
POST /api/v1/events/{eventId}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Evento muito interessante! Mal posso esperar!"
}
```

### Responder a um Comentário
```http
POST /api/v1/events/{eventId}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Concordo totalmente!",
  "parentId": "comment-uuid"
}
```

### Editar Comentário (Próprio)
```http
PATCH /api/v1/comments/{commentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Comentário editado"
}
```

### Deletar Comentário (Próprio)
```http
DELETE /api/v1/comments/{commentId}
Authorization: Bearer {token}
```

## 📝 Inscrições em Eventos

### Inscrever-se em Evento
```http
POST /api/v1/events/{eventId}/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "additionalInfo": {
    "telefone": "11999999999",
    "dietaRestritiva": "Vegetariano",
    "observacoes": "Preciso de certificado"
  }
}
```

### Ver Minhas Inscrições
```http
GET /api/v1/registrations/my-registrations
Authorization: Bearer {token}
```

### Ver Inscrições de um Evento (Admin)
```http
GET /api/v1/events/{eventId}/registrations
Authorization: Bearer {admin-token}
```

### Cancelar Inscrição
```http
DELETE /api/v1/registrations/{registrationId}
Authorization: Bearer {token}
```

### Atualizar Status de Inscrição (Admin)
```http
PATCH /api/v1/registrations/{registrationId}
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "status": "attended"
}
```

## 📤 Upload de Arquivos

### Upload de Imagem
```http
POST /api/v1/uploads/image
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [arquivo-imagem]
```

**Resposta:**
```json
{
  "url": "http://localhost:3000/uploads/abc123.jpg",
  "filename": "abc123.jpg"
}
```

### Deletar Arquivo (Admin)
```http
DELETE /api/v1/uploads/{filename}
Authorization: Bearer {admin-token}
```

## 🎨 Galeria de Imagens de Evento

### Adicionar Imagem à Galeria (Admin)
```http
POST /api/v1/events/{eventId}/images
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "url": "http://localhost:3000/uploads/image.jpg",
  "caption": "Momento da palestra",
  "order": 1
}
```

### Listar Imagens da Galeria
```http
GET /api/v1/events/{eventId}/images
```

### Deletar Imagem da Galeria (Admin)
```http
DELETE /api/v1/events/{eventId}/images/{imageId}
Authorization: Bearer {admin-token}
```

## 📊 Estatísticas (Admin)

### Dashboard Resumo
```http
GET /api/v1/admin/dashboard
Authorization: Bearer {admin-token}
```

**Resposta:**
```json
{
  "totalUsers": 150,
  "totalEvents": 25,
  "upcomingEvents": 8,
  "totalRegistrations": 450,
  "recentActivity": [...]
}
```

## 🔍 Filtros e Paginação

### Eventos com Paginação
```http
GET /api/v1/events?page=1&limit=10
```

### Eventos por Categoria
```http
GET /api/v1/events?category=Workshop
```

### Eventos por Data
```http
GET /api/v1/events?startDate=2025-11-01&endDate=2025-12-31
```

### Eventos por Status
```http
GET /api/v1/events?status=PUBLISHED
```

### Combinando Filtros
```http
GET /api/v1/events?category=Workshop&status=PUBLISHED&search=machine&page=1&limit=10
```

## 🧪 Testando com cURL

### Login e Salvar Token
```bash
# Linux/Mac
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ieee.org","password":"Admin@123"}' \
  | jq -r '.access_token')

echo $TOKEN

# Usar o token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/v1/users/me
```

## 📱 Testando com HTTPie

```bash
# Install: pip install httpie

# Login
http POST http://localhost:3000/api/v1/auth/login \
  email=admin@ieee.org \
  password=Admin@123

# Requisição autenticada
http GET http://localhost:3000/api/v1/users/me \
  "Authorization: Bearer {token}"

# Criar evento
http POST http://localhost:3000/api/v1/events \
  "Authorization: Bearer {admin-token}" \
  title="Novo Evento" \
  description="Descrição do evento" \
  startDate="2025-12-01T09:00:00Z" \
  location="Online" \
  category="Palestra" \
  status="PUBLISHED"
```

## 🧪 Collection Postman/Insomnia

Importe este JSON no Postman ou Insomnia:

```json
{
  "name": "IEEE API",
  "requests": [
    {
      "name": "Login Admin",
      "method": "POST",
      "url": "{{base_url}}/auth/login",
      "body": {
        "email": "admin@ieee.org",
        "password": "Admin@123"
      }
    },
    {
      "name": "Get My Profile",
      "method": "GET",
      "url": "{{base_url}}/users/me",
      "headers": {
        "Authorization": "Bearer {{token}}"
      }
    },
    {
      "name": "List Events",
      "method": "GET",
      "url": "{{base_url}}/events"
    }
  ],
  "variables": {
    "base_url": "http://localhost:3000/api/v1",
    "token": ""
  }
}
```

## 🎯 Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Sucesso sem conteúdo de retorno
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `409 Conflict` - Conflito (ex: email já existe)
- `422 Unprocessable Entity` - Validação falhou
- `500 Internal Server Error` - Erro no servidor

## 💡 Dicas

1. **Use variáveis de ambiente** em seus testes
2. **Salve o token** após login para reutilizar
3. **Teste os erros** propositalmente para ver as mensagens
4. **Use o Swagger** para testar interativamente: http://localhost:3000/api/docs
5. **Verifique o Prisma Studio** para ver os dados: `npm run prisma:studio`
