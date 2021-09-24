class InvalidCpf extends Error {
  constructor() {
    super();
    this.message = 'Invalid CPF';
  }
}

export default InvalidCpf;
