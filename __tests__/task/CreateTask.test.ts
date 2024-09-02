import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('CreateTask', () => {
  it('should create a task', async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task 1',
      description: 'You probably won’t do this',
      completed: false,
      user_id: 20,
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual("number");
  });

  it('should return error messages when required fields are missing', async () => {
    const response = await testServer.post('/api/v1/task').send({});

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.user_id");
    expect(response.body).toHaveProperty("errors.body.title");
    expect(response.body).toHaveProperty("errors.body.description");
  });

  it("should return error messages when title.length < 5", async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task',
      description: 'You probably won’t do this',
      userId: 20,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.title");
  });

  it("should return error messages when description.length < 10", async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task 1',
      description: 'You prob',
      userId: 20,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.description");
  });

  it("should return error messages when user_id is a string", async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task',
      description: 'You probably won’t do this',
      userId: "Twenty",
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.user_id");
  });

  it("should return error messages when user_id is a float", async () => {
    const response = await testServer.post('/api/v1/task').send({
      title: 'Task',
      description: 'You probably won’t do this',
      user_id: 1.2,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.user_id");
  });
});
