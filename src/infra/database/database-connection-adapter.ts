import pgp from 'pg-promise';

import DatabaseConnection from './database-connection';


export default class DatabaseConnectionAdapter implements DatabaseConnection {
  pgp: any;

  constructor(url?: string) {
    this.pgp = pgp()(url || 'postgres://postgres:123456@localhost:5432/app');
  }

  query(statement: string, params: any) {
    return this.pgp.query(statement, params);
  }

  close(): Promise<void> {
    return this.pgp.$pool.end();
  }
}
