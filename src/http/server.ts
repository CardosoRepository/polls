import fastify from "fastify";

const app = fastify();

app.get("/hello", (req, resp) => {
    console.log("Hello NLW");

    return resp.status(200).send("Hello NLW");
})

app.listen({
    port: 3333,
}).then(() => {
    console.log("Http server running!");
});
