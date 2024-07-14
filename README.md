<p>
<img src=./imgs/cover.png alt="cover_spacetime">
</p>

<h1 align="center">
   NLW Spacetime - Cápsula do Tempo
</h1>

<p align="center">
  <img alt="Create at" src="https://img.shields.io/github/created-at/jsnevt/nlw_spacetime">
  <img alt="Made by Jason Santos" src="https://img.shields.io/badge/made%20by-Jason Santos-%20?color=6c4ad0">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/JsnEvt/NLW_Spacetime">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jsnevt/nlw_spacetime">
  <img alt="GitHub license" src="https://img.shields.io/github/license/JsnEvt/NLW_Spacetime">
</p>

<p align="center">
  <a href="#rocket-tecnologias">🚀 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-autores">💻 Autores</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">📝 Licença</a>
</p>

<p align="center">
  O <b>NLW Spacetime - Cápsula do Tempo</b> é o projeto desenvolvido durante a <b>NLW Spacetime da Rocketseat</b>, utilizando <b>NodeJS</b> com <b>Fastify</b> e <b>React</b> com <b>NextJS 13</b>.
</p>


## Objetivo
O principal objetivo da aplicação Spacetime é fornecer uma plataforma intuitiva e envolvente para que os usuários possam documentar e reviver suas memórias. Através dessa ferramenta, os usuários podem criar um diário digital interativo que serve tanto como um repositório pessoal quanto uma maneira de compartilhar suas histórias com outras pessoas.

## Benefícios
Preservação de Memórias: Ajuda os usuários a manter um registro organizado e duradouro de suas experiências.
Facilidade de Acesso: Oferece uma maneira fácil de acessar e refletir sobre momentos passados.
Interatividade: Promove a interação e o compartilhamento de histórias entre amigos e familiares.


<div align="center">
  <img alt="web_browser" src="https://github.com/JsnEvt/NLW_Spacetime/blob/main/img_rdme/web_browser.png">
  <img alt="capa_mobile" src="https://github.com/JsnEvt/NLW_Spacetime/blob/main/img_rdme/capa_mobile.png">
  <img alt="capa_mobile" src="https://github.com/JsnEvt/NLW_Spacetime/blob/main/img_rdme/adding_photo_msg.png">
</div>


# :information_source: Como Executar?

> Clone o Repositório:

```bash
git clone https://github.com/JsnEvt/NLW_Spacetime
```

## Server

> Acesse o Server

```bash
cd server
```

> Instale as dependências:

```bash
npm i
```

> Crie um arquivo .env na raíz e informe as variáveis de ambiente

```bash
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

> Execute o Prisma para criar as tabelas

```bash
npx prisma migrate dev
```

> Inicie o Serviço:

```bash
npm run dev
```

## Web

> Com o Server Iniciado, acesse o projeto Web:

```bash
cd .. && cd web
```

> Instale as dependências:

```bash
npm i
```

> Em um arquivo .env.local, informe a variável de ambiente
```bash
NEXT_PUBLIC_GITHUB_CLIENT_ID=
```

> Inicie o Projeto:

```bash
npm run dev
```

> ➡️ Acesse [http://localhost:3000](http://localhost:3000) para acessar a aplicação web.



# :rocket: Tecnologias

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DayJS](https://day.js.org/)
- [JS Cookie](https://github.com/js-cookie/js-cookie)
- [JWT Decode](https://github.com/auth0/jwt-decode#readme)

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/JsnEvt/">
        <img src="https://avatars.githubusercontent.com/u/110934550?v=4" width="100px;" alt="Jason Santos"/>
        <br />
        <sub>
          <b>Jason Santos</b>
        </sub>
       </a>
       <br />
       <a href="https://www.linkedin.com/in/jason-everton/" title="Linkedin">@jason-everton</a>
       <br />
    </td>
    <td align="center">
      <a href="http://github.com/rocketseat/">
        <img src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4" width="100px;" alt="Logo da Rocketseat"/>
        <br />
        <sub>
          <b>Rocketseat</b>
        </sub>
       </a>
       <br />
       <a href="http://github.com/rocketseat/" title="Linkedin">@rocketseat</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Education Platform">🚀</a>
    </td>
  </tr>
</table>



# :memo: Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo de [licença](./LICENSE) para mais detalhes.
