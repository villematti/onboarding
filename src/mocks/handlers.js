import { rest } from 'msw';

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
      return res(ctx.json([{ id: 1, name: 'Test user' }, { id: 2, name: 'Test user2' }]))
    }),
    rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
      return res(ctx.json([{
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
      },
      {
        "userId": 2,
        "id": 22,
        "title": "distinctio vitae autem nihil ut molestias quo",
        "completed": true
      },
      {
        "userId": 2,
        "id": 23,
        "title": "et itaque necessitatibus maxime molestiae qui quas velit",
        "completed": false
      },]))
    }),
    rest.put('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
        return res(ctx.json({
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": true,
          },
        ));
    }),
];