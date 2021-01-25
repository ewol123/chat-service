import { IUnitOfWork } from "../domain/repository/IUnitOfWork";
import {
  Connection,
  QueryRunner,
  EntityManager,
  Repository,
  Entity,
  BaseEntity,
} from "typeorm";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class UnitOfWork implements IUnitOfWork {
  private readonly asyncDatabaseConnection: Connection;
  private queryRunner: QueryRunner;

  constructor(@inject(TYPES.DbConnection) asyncDatabaseConnection: Connection) {
    this.asyncDatabaseConnection = asyncDatabaseConnection;
  }

  async start() {
    this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
    await this.queryRunner.startTransaction();
  }

  getRepository(entity: any): any {
    if (this.queryRunner.isReleased) {
      throw new Error("use start method to create a query runner");
    }
    return this.queryRunner.manager.getRepository(entity);
  }

  async complete(work: () => Promise<void>) {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }
}
