// Importa o Prisma Client
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do cliente
const prisma = new PrismaClient()

// Exporta para usar em outros arquivos
module.exports = prisma