export default interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): any;
}
