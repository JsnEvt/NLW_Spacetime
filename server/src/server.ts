import 'dotenv/config'
import fastify from 'fastify';
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';

const app = fastify()

app.register(cors, {
  origin: true, //todas as URLs de front-end poderao acessar nosso back-end
  // o correto e determinar um array de rotas que tem essa permissao.
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes)
app.register(memoriesRoutes)


app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server is running')
})