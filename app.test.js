import test from 'ava';
import app from './app.js';
test('hello world', async t => {
    const harness = app();
    const response = await harness.inject({
        method: 'GET',
        url: '/'
    })

    t.is(response.statusCode, 200);
    t.deepEqual(JSON.parse(response.body), { hello: 'world' });
});


test('not found', async t => {
    const harness = app();
    const response = await harness.inject({
        method: 'GET',
        url: '/foo'
    });

  t.is(response.statusCode, 404);
})

test('luke', async t => {
    const harness = app();
    const response = await harness.inject({
        method: 'GET',
        url: '/luke'
    })

    t.is(response.statusCode, 200);
    t.is(JSON.parse(response.body).name, "Luke Skywalker")
})
