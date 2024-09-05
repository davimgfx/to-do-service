import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { userSignInMock } from './mock';

describe('SignIn', () => {
  it('should sign in successfully with correct credentials', async () => {
    const signInResponse = await testServer.post('/api/v1/auth/login').send(userSignInMock);

    expect(signInResponse.statusCode).toEqual(StatusCodes.OK);
    expect(signInResponse.body.accessToken).toBeTruthy
  });

  it('should return error message for incorrect email', async () => {
    const response = await testServer.post('/api/v1/auth/login').send({
      email: 'wrongemail@example.com',
      password: userSignInMock.password,
    });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default', 'Email or password incorrect');
  });

  it('should return error message for incorrect password', async () => {
    const response = await testServer.post('/api/v1/auth/login').send({
      email: userSignInMock.email,
      password: 'wrongpassword',
    });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default', 'Email or password incorrect');
  });

  it('should return error messages when required fields are missing', async () => {
    const response = await testServer.post('/api/v1/auth/login').send({});

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
    expect(response.body).toHaveProperty('errors.body.password');
  });

  it('should return error messages when email length is < 3', async () => {
    const response = await testServer.post('/api/v1/auth/login').send({
      email: 'ab',
      password: userSignInMock.password,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
  });

  it('should return error messages when password length is < 6', async () => {
    const response = await testServer.post('/api/v1/auth/login').send({
      email: userSignInMock.email,
      password: '12345',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
  });
});
