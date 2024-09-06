import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { createdTaskMock} from './mock';
import { userSignInMock } from '../user/mock';

describe('UpdateByTaskId', () => {
  let accessToken: string;

  beforeAll(async () => {
    const signInResponse = await testServer
      .post('/api/v1/auth/login')
      .send(userSignInMock);

    accessToken = signInResponse.body.accessToken;
  });

  const updateTaskById = (taskId: number | string, body: object) =>
    testServer.put(`/api/v1/task/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);

  it('should update a task by id', async () => {
    const createResponse = await testServer
      .post('/api/v1/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createdTaskMock);

    const updateResponse = await updateTaskById(createResponse.body, {
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(updateResponse.statusCode).toEqual(StatusCodes.OK);
    expect(updateResponse.body).toHaveProperty(
      'message',
      'Task updated successfully'
    );

    await testServer
      .delete(`/api/v1/task/${createResponse.body}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
  });

  it('should return an error when the task id is not found', async () => {
    const response = await updateTaskById(99999, {
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should return validation error when id is not a number', async () => {
    const response = await updateTaskById('not-a-number', {
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when id is less than 1', async () => {
    const response = await updateTaskById(0, {
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
  });

  it('should return validation error when required fields are missing', async () => {
    const response = await updateTaskById(999, {});

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.title');
    expect(response.body).toHaveProperty('errors.body.description');
    expect(response.body).toHaveProperty('errors.body.completed');
  });
});
