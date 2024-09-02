import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('UpdateByTaskId', () => {
  let taskId: number;

  beforeAll(async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task to be updated',
      description: 'This task will be updated',
      completed: false,
      user_id: 20,
    });

    taskId = response.body;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should update a task by id', async () => {
    const response = await testServer.put(`/api/v1/task/${taskId}`).send({
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('message', 'Task updated successfully');
  });

  it('should return an error when the task id is not found', async () => {
    const response = await testServer.put('/api/v1/task/99999').send({
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when id is not a number', async () => {
    const response = await testServer.put('/api/v1/task/not-a-number').send({
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when id is less than 1', async () => {
    const response = await testServer.put('/api/v1/task/0').send({
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when required fields are missing', async () => {
    const response = await testServer.put(`/api/v1/task/${taskId}`).send({
      title: 'Sho',
      description: 'Short',
      completed: 'not-a-boolean', 
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.title');
    expect(response.body).toHaveProperty('errors.body.description');
    expect(response.body).toHaveProperty('errors.body.completed');
  });
});
