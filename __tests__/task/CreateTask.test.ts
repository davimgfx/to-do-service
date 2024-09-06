import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { createdTaskMock } from './mock';
import { userSignInMock } from '../user/mock';

describe('CreateTask', () => {
  let accessToken: string;

  beforeAll(async () => {
    const tokenResponse = await testServer
      .post('/api/v1/auth/login')
      .send(userSignInMock);
    accessToken = tokenResponse.body.accessToken;
  });

  const createTask = async (taskData: any) =>
    testServer
      .post('/api/v1/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(taskData);

  it('should create a task', async () => {
    const createResponse = await createTask(createdTaskMock);
    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof createResponse.body).toEqual('number');

    // Exclui a task criada
    await testServer
      .delete(`/api/v1/task/${createResponse.body}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
  });

  it('should return error messages when user is not authenticated', async () => {
    const createResponse = await testServer.post('/api/v1/task').send(createdTaskMock);
    expect(createResponse.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(createResponse.body).toHaveProperty('errors.default');
  });

  it('should return error messages when required fields are missing', async () => {
    const response = await createTask({});
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.user_id');
    expect(response.body).toHaveProperty('errors.body.title');
    expect(response.body).toHaveProperty('errors.body.description');
  });

  it('should return error messages when title.length < 5', async () => {
    const response = await createTask({
      title: 'Task',
      description: 'You probably won’t do this',
      userId: 20,
    });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.title');
  });

  it('should return error messages when description.length < 10', async () => {
    const response = await createTask({
      title: 'Task 1',
      description: 'You prob',
      userId: 20,
    });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.description');
  });

  it('should return error messages when user_id is a string', async () => {
    const response = await createTask({
      title: 'Task',
      description: 'You probably won’t do this',
      userId: 'Twenty',
    });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.user_id');
  });

  it('should return error messages when user_id is a float', async () => {
    const response = await createTask({
      title: 'Task',
      description: 'You probably won’t do this',
      user_id: 1.2,
    });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.user_id');
  });
});
