Comandos utilizados:
    npm init -y: Criação do package.json
    npm i typescript @types/node -D: Habilitar o uso do Typescript; Integrar o TS com Node
    npm tsc --init: Criação do tsconfig.json -> Primeira ação é tomada!
    npm i tsx -D: Automatiza o processo de conversão do TS para JS para o Node executá-lo
    npm i fastify
    docker compose up -d -> Segunda ação é tomada!
    npm i -D prisma
    npx prisma init -> Terceira ação é tomada!
    npx prisma migrate dev: gera a tabela de enquetes
        Enter a name for the new migration: create polls
    npx prisma studio: Interface Web para navegar pelo banco de dados
    npm i zod: Validação de dados da requisição (Primeiramente utilizada no contexto de request.body...)
    npm i @fastify/cookie

Ações tomadas:
    Acessar https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping;
        Buscar a versão do Node e alterar o tsconfig.json de acordo.
    Adição do docker-compose.yml
    Alterar o arquivo .env com os dados que foram configurados no docker-compose.yml
    Opcional: Adicionar o seguinte comando no settings.json (Para VSCode) -> "[prisma]": { "editor.formatOnSave": true }