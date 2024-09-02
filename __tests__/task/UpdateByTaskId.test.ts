import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { createdTaskMock } from './mock';

describe('UpdateByTaskId', () => {
  it('should update a task by id', async () => {
    const createResponse = await testServer.post('/api/v1/task').send(createdTaskMock);

    const updateResponse = await testServer
      .put(`/api/v1/task/${createResponse.body}`)
      .send({
        title: 'Updated Task Title',
        description: 'Updated Task Description',
        completed: true,
      });

    expect(updateResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(updateResponse.body).toHaveProperty(
      'message',
      'Task updated successfully'
    );

    const deleteResponse = await testServer
      .delete(`/api/v1/task/${createResponse.body}`)
      .send();
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
    const response = await testServer.put(`/api/v1/task/999`).send({});

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.title');
    expect(response.body).toHaveProperty('errors.body.description');
    expect(response.body).toHaveProperty('errors.body.completed');
  });
});
