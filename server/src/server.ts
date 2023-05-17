import fastify from 'fastify';
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories';

const app = fastify()

app.register(cors, {
  origin: true, //todas as URLs de front-end poderao acessar nosso back-end
  // o correto e determinar um array de rotas que tem essa permissao.
})

app.register(memoriesRoutes)


app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server is running')
})