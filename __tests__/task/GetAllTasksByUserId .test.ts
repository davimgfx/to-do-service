import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { createdTaskMock } from './mock';

// First create a user with this infos:
// {
//   "name": "Usuario Teste 1",
//   "email" : "usuario1@teste.com",
//   "password" : "password123"
// }
// After that, create three task with this infos:
// {
//     "user_id": (userId),
//     "title": "Task Repetida",
//     "description": "Description of the first repeated task.",
//     "completed": false,
//   },
//   {
//     "user_id": (userId),
//     "title": "Task Repetida",
//     "description": "Description of the second repeated task.",
//     "completed": false,
//   },
//   {
//     "user_id": (userId),
//     "title": "Task Única",
//     "description": "Description of the unique task.",
//     "completed": false,
//   }

describe('GetAllTasksByUserId', () => {
  it('should retrieve all tasks particular user', async () => {
    const response = await testServer.get('/api/v1/tasks').query({
      user_id:  createdTaskMock.user_id,
    }).send();



    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toEqual(3);
  })

  it('should retrieve tasks with pagination and filter', async () => {
    const response = await testServer
      .get('/api/v1/tasks')
      .query({
        filter: 'Task Repetida',
        user_id: createdTaskMock.user_id,
      })
      .send();


    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('title', 'Task Repetida');
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
