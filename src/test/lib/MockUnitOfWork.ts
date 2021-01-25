import { IUnitOfWork } from "../../domain/repository/IUnitOfWork";
import { injectable } from "inversify";

@injectable()
export class MockUnitOfWork implements IUnitOfWork {
  start(): Promise<void> {
    return;
  }
  async complete(work: () => Promise<void>): Promise<void> {
    await work();
  }
  getRepository(R: any) {
    return;
  }
}
