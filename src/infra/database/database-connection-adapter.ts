import pgp from 'pg-promise';

import DatabaseConnection from './database-connection';


export default class DatabaseConnectionAdapter implements DatabaseConnection {
  private static readonly pgpMap: Map<string, any> = new Map();
  pgp: any;

  constructor(url?: string) {
    const connectionUrl = url || 'postgres://postgres:123456@localhost:5432/app';
    if (!DatabaseConnectionAdapter.pgpMap.get(connectionUrl)) {
      DatabaseConnectionAdapter.pgpMap.set(connectionUrl, pgp()(connectionUrl));
    }
    this.pgp = DatabaseConnectionAdapter.pgpMap.get(connectionUrl);
  }

  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params);
  }

  close(): Promise<void> {
    return this.pgp.$pool.end();
  }
}
