import log from "../../utils/logger";

export class BusinessError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class ApplicationError {
  businessErrors: BusinessError[];

  constructor(error: any) {
    if (error instanceof BusinessError) {
      if (Array.isArray(error)) {
        this.businessErrors = error;
      } else {
        this.businessErrors = [error];
      }
    } else {
      // some unexpected error happened. log the full error but only return a generic response due to security reasons.
      this.businessErrors = [
        new BusinessError("some unexpected error happened"),
      ];
      log.error(error);
    }
  }
}
