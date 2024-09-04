// This sql code is necessary to run the tests about task. Please execute it in your database.

// -- Temporarily disable auto-increment to allow insertion of specific IDs
// SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

// -- Insert the first user with ID 99225
// INSERT INTO User (id, nome, email, senha, created_at, updated_at)
// VALUES (99225, 'Usuario Teste 1', 'usuario1@teste.com', 'senha123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Insert tasks for user 99225
// -- Insert the first task for user 99225
// INSERT INTO Task (user_id, title, description, completed, created_at, updated_at)
// VALUES (99225, 'Task Repetida', 'Description of the first repeated task.', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Insert the second task with the same title for user 99225
// INSERT INTO Task (user_id, title, description, completed, created_at, updated_at)
// VALUES (99225, 'Task Repetida', 'Description of the second repeated task.', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Insert the third task with a different title for user 99225
// INSERT INTO Task (user_id, title, description, completed, created_at, updated_at)
// VALUES (99225, 'Task Única', 'Description of the unique task.', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

// -- Reactivate the default auto-increment behavior
// SET SESSION sql_mode = '';

export const createdTaskMock = {
    title: 'Task 1',
    description: 'You probably won’t do this',
    completed: false,
    user_id: 99225,
}