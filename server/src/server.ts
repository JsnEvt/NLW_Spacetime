import fastify from 'fastify';
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()


app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server is running')
})