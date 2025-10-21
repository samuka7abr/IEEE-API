#!/bin/bash

echo "🚀 Iniciando setup do projeto IEEE API..."
echo ""

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso!"
echo ""

# Copiar .env.example para .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado!"
    echo "⚠️  IMPORTANTE: Edite o arquivo .env com suas configurações"
else
    echo "✅ Arquivo .env já existe"
fi
echo ""

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo "❌ Erro ao gerar Prisma Client"
    exit 1
fi

echo "✅ Prisma Client gerado com sucesso!"
echo ""

# Perguntar se deseja executar migrations
echo "❓ Deseja executar as migrations do banco de dados agora? (s/n)"
read -r response

if [[ "$response" =~ ^[Ss]$ ]]; then
    echo "🗄️  Executando migrations..."
    npm run prisma:migrate
    
    if [ $? -eq 0 ]; then
        echo "✅ Migrations executadas com sucesso!"
        echo ""
        
        # Perguntar se deseja popular o banco
        echo "❓ Deseja popular o banco com dados de exemplo? (s/n)"
        read -r seed_response
        
        if [[ "$seed_response" =~ ^[Ss]$ ]]; then
            echo "🌱 Executando seed..."
            npm run prisma:seed
            
            if [ $? -eq 0 ]; then
                echo "✅ Seed executado com sucesso!"
                echo ""
                echo "📝 Credenciais criadas:"
                echo "   Admin: admin@ieee.org / Admin@123"
                echo "   User: user@ieee.org / User@123"
            else
                echo "⚠️  Erro ao executar seed"
            fi
        fi
    else
        echo "⚠️  Erro ao executar migrations"
        echo "   Certifique-se de que o PostgreSQL está rodando e o .env está configurado"
    fi
fi

echo ""
echo "🎉 Setup concluído!"
echo ""
echo "📚 Próximos passos:"
echo "   1. Configure o arquivo .env com suas credenciais"
echo "   2. Inicie o PostgreSQL (ou use: docker-compose up -d postgres)"
echo "   3. Execute: npm run prisma:migrate (se não executou ainda)"
echo "   4. Inicie o servidor: npm run start:dev"
echo "   5. Acesse a documentação: http://localhost:3000/api/docs"
echo ""
echo "✨ Happy coding!"
