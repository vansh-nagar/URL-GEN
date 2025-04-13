class ApiError extends Error {
  constructor(status, message = "someting went wront", error = []) {
    super(message);

    this.status = status;
    this.error = error;
    this.success = false;
  }
}

export { ApiError };
