import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { userCreateMock } from './mock';
import { number } from 'yup';

describe('CreateUser', () => {
  it('should create a user successfully with valid data', async () => {

    // remember to delete this user in database after test
    const createUserResponse = await testServer
      .post('/api/v1/auth/register')
      .send(userCreateMock);

    expect(createUserResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(createUserResponse.body).toBeGreaterThan(0);
  });

  it('should return error message for missing email', async () => {
    const response = await testServer.post('/api/v1/auth/register').send({
      name: userCreateMock.name,
      password: userCreateMock.password,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
  });

  it('should return error message for missing password', async () => {
    const response = await testServer.post('/api/v1/auth/register').send({
      name: userCreateMock.name,
      email: userCreateMock.email,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
  });

  it('should return error message when name length is < 3', async () => {
    const response = await testServer.post('/api/v1/auth/register').send({
      name: 'Jo',
      email: userCreateMock.email,
      password: userCreateMock.password,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });

  it('should return error message when email length is < 3', async () => {
    const response = await testServer.post('/api/v1/auth/register').send({
      name: userCreateMock.name,
      email: 'ab',
      password: userCreateMock.password,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
  });

  it('should return error message when password length is < 6', async () => {
    const response = await testServer.post('/api/v1/auth/register').send({
      name: userCreateMock.name,
      email: userCreateMock.email,
      password: '12345',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
  });
});
