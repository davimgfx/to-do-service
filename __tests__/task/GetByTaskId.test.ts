import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetByTaskId', () => {
  let taskId: number;

  beforeAll(async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task to be retrieved',
      description: 'This task will be retrieved',
      completed: false,
      user_id: 20,
    });

    taskId = response.body;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should retrieve a task by id', async () => {
    const response = await testServer.get(`/api/v1/task/${taskId}`).send();

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('completed');
  });

  it('should return an error when the task id is not found', async () => {
    const response = await testServer.get('/api/v1/task/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when id is not a number', async () => {
    const response = await testServer.get('/api/v1/task/not-a-number').send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when id is less than 1', async () => {
    const response = await testServer.get('/api/v1/task/0').send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
