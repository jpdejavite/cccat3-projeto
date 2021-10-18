export default interface DatabaseConnection {
  query(statement: string, params: any): any;
  close(): any;
}
