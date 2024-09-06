import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { createdTaskMock } from './mock';
import { userSignInMock } from '../user/mock';

describe('DeleteByTaskId', () => {
  let accessToken: string;

  beforeAll(async () => {
    const tokenResponse = await testServer
      .post('/api/v1/auth/login')
      .send(userSignInMock);
    accessToken = tokenResponse.body.accessToken;
  });

  const createTask = async () =>
    testServer
      .post('/api/v1/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createdTaskMock);

  it('should delete a task by id', async () => {
    const createResponse = await createTask();
    const taskId = createResponse.body;

    const deleteResponse = await testServer
      .delete(`/api/v1/task/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.OK);
    expect(deleteResponse.body).toBe(1);
  });

  it('should return an error when the task id is not found', async () => {
    const response = await testServer
      .delete('/api/v1/task/99999')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when id is not a number', async () => {
    const response = await testServer
      .delete('/api/v1/task/not-a-number')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when id is less than 1', async () => {
    const response = await testServer
      .delete('/api/v1/task/0')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
