// First create a user with this infos:
// {
//   "name": "Usuario Teste 1",
//   "email" : "usuario1@teste.com",
//   "password" : "password123"
// }
// After that, create three task with this infos:
// {
//     "user_id": (userId),
//     "title": "Task Repetida",
//     "description": "Description of the first repeated task.",
//     "completed": false,
//   },
//   {
//     "user_id": (userId),
//     "title": "Task Repetida",
//     "description": "Description of the second repeated task.",
//     "completed": false,
//   },
//   {
//     "user_id": (userId),
//     "title": "Task Única",
//     "description": "Description of the unique task.",
//     "completed": false,
//   }

export const userSignInMock = {
  email: 'usuariopvp@email.com',
  password: 'senha123',
};

export const userCreateMock = {
  name: 'Usuario Teste',
  email: 'usuarionewteste@gmail.com',
  password: 'senha123',
}
