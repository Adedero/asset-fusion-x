import { FetchError } from "ofetch";

export default function normalizeException(exception: unknown): Error {
  //console.log(exception);
  let message: string = "";

  if (exception instanceof FetchError) {
    if (exception.data) {
      if (exception.data.statusMessage) {
        message = exception.data.statusMessage as string;
      } else if (exception.data.message) {
        message = exception.data.message as string;
      }
    } else if (exception.statusMessage) {
      message = exception.statusMessage;
    } else if (exception.message) {
      message = exception.message;
    } else if (exception.statusText) {
      message = exception.statusText;
    }
  } else if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === "string") {
    message = exception;
  } else if (
    typeof exception === "object" &&
    exception !== null &&
    !Array.isArray(exception)
  ) {
    if ("message" in exception && typeof exception.message === "string") {
      message = exception.message;
    } else if ("error" in exception && typeof exception.error === "string") {
      message = exception.error;
    }
  } else {
    message = String(exception);
  }

  return new Error(message);
}
