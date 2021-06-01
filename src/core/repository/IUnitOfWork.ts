export interface IUnitOfWork {
  start(): Promise<void>;
  complete(work: () => Promise<void>): Promise<void>;
  getRepository(R: any): any;
}
