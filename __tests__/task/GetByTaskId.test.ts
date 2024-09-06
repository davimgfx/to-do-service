import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { createdTaskMock } from './mock';
import { userSignInMock } from '../user/mock';

describe('GetByTaskId', () => {
  let accessToken: string;

  beforeAll(async () => {
    const signInResponse = await testServer
      .post('/api/v1/auth/login')
      .send(userSignInMock);

    accessToken = signInResponse.body.accessToken;
  });

  const getTaskById = (taskId: number | string) =>
    testServer.get(`/api/v1/task/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

  it('should retrieve a task by id', async () => {
    const createResponse = await testServer
      .post('/api/v1/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createdTaskMock);

    const response = await getTaskById(createResponse.body);

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('completed');

    await testServer
      .delete(`/api/v1/task/${createResponse.body}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
  });

  it('should return an error when the task id is not found', async () => {
    const response = await getTaskById(99999);

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when id is not a number', async () => {
    const response = await getTaskById('not-a-number');

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when id is less than 1', async () => {
    const response = await getTaskById(0);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
