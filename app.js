import fastify from "fastify";
import fetch from 'node-fetch';

export default function build(opts={}) {
    const app = fastify(opts)
    app.get('/', async function (request, reply) {
        return { hello: 'world' }
    })

    app.get('/luke', async function(request, reply) {
        return fetch('https://swapi.dev/api/people/1')
            .then(res => res.json())
    })

    return app
}
