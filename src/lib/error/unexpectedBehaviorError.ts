export class UnexpectedBehaviorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnexpectedBehaviorError"
  }
}