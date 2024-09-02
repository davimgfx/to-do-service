import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

// await testServer.post('/api/v1/task').send({
//   title: 'Task 1',
//   description: 'Description 1',
//   completed: false,
//   user_id: 91225,
// });

// await testServer.post('/api/v1/task').send({
//   title: 'Task 1',
//   description: 'Description 2',
//   completed: true,
//   user_id: 91225,
// });

// await testServer.post('/api/v1/task').send({
//   title: 'Task 3',
//   description: 'Description 3',
//   completed: false,
//   user_id: 91226,
// });

describe('GetAllTasks', () => {
  it('should retrieve all tasks particular user', async () => {
    const response = await testServer.get('/api/v1/tasks').query({
      user_id: 91225,
    }).send();

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toEqual(2);
  })

  it('should retrieve tasks with pagination and filter', async () => {
    const response = await testServer
      .get('/api/v1/tasks')
      .query({
        filter: 'Task 1',
        user_id: 91225,
      })
      .send();


    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('title', 'Task 1');
    expect(response.headers['x-total-count']).toBeDefined();
  });

  it('should return validation error when page is less than 1', async () => {
    const response = await testServer
      .get('/api/v1/tasks')
      .query({
        page: 0,
      })
      .send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return validation error when limit is less than 1', async () => {
    const response = await testServer
      .get('/api/v1/tasks')
      .query({
        limit: 0,
      })
      .send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when user_id is not a number', async () => {
    const response = await testServer
      .get('/api/v1/tasks')
      .query({
        user_id: 'not-a-number',
      })
      .send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.default');
  });
});
