import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('DeleteByTaskId', () => {
  it('should delete a task by id', async () => {
    const createResponse = await testServer.post('/api/v1/task').send({
      title: 'Task to be deleted',
      description: 'This task will be deleted',
      completed: false,
      user_id: 20,
    });

    const taskId = createResponse.body;

    const deleteResponse = await testServer
      .delete(`/api/v1/task/${taskId}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.OK);
    expect(deleteResponse.body).toBe(1);
  });

  it('should return an error when the task id is not found', async () => {
    const response = await testServer.delete('/api/v1/task/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);

    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when id is not a number', async () => {
    const response = await testServer
      .delete('/api/v1/task/not-a-number')
      .send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when id is less than 1', async () => {
    const response = await testServer.delete('/api/v1/task/0').send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
