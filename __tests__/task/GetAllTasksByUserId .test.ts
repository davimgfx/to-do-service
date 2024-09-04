import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

// This sql code is necessary to run the tests about task. Please execute it in your database.

// -- Temporarily disable auto-increment to allow insertion of specific IDs
// SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

// -- Insert the first user with ID 99225
// INSERT INTO User (id, nome, email, senha, created_at, updated_at)
// VALUES (99225, 'Usuario Teste 1', 'usuario1@teste.com', 'senha123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Insert tasks for user 99225
// -- Insert the first task for user 99225
// INSERT INTO Task (user_id, title, description, completed, created_at, updated_at)
// VALUES (99225, 'Task Repetida', 'Description of the first repeated task.', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Insert the second task with the same title for user 99225
// INSERT INTO Task (user_id, title, description, completed, created_at, updated_at)
// VALUES (99225, 'Task Repetida', 'Description of the second repeated task.', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Insert the third task with a different title for user 99225
// INSERT INTO Task (user_id, title, description, completed, created_at, updated_at)
// VALUES (99225, 'Task Única', 'Description of the unique task.', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Reactivate the default auto-increment behavior
// SET SESSION sql_mode = '';

describe('GetAllTasksByUserId', () => {
  it('should retrieve all tasks particular user', async () => {
  

    const response = await testServer.get('/api/v1/tasks').query({
      user_id: 99225,
    }).send();


    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toEqual(3);
  })

  it('should retrieve tasks with pagination and filter', async () => {
    const response = await testServer
      .get('/api/v1/tasks')
      .query({
        filter: 'Task Repetida',
        user_id: 99225,
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
