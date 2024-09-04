import { ITask, IUser } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    task: ITask;
    user: IUser
  }
}
