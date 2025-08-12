export default function normalizeException(exception: unknown): Error {
  let normalizedException: Error;

  if (exception instanceof Error) {
    normalizedException = exception;
  } else if (
    typeof exception === "object" &&
    exception !== null &&
    !Array.isArray(exception)
  ) {
    if ("data" in exception) {
      normalizedException = new Error((exception.data as Record<string, string>).statusMessage);
    } else if ("message" in exception && typeof exception.message === "string") {
      normalizedException = new Error(exception.message);
    } else if (
      "statusMessage" in exception &&
      typeof exception.statusMessage === "string"
    ) {
      normalizedException = new Error(exception.statusMessage);
    } else if (
      "statusText" in exception &&
      typeof exception.statusText === "string"
    ) {
      normalizedException = new Error(exception.statusText);
    } else {
      try {
        normalizedException = new Error(JSON.stringify(exception));
      } catch {
        normalizedException = new Error(
          `Unserializable error object of type: ${Object.prototype.toString.call(
            exception,
          )}`,
        );
      }
    }

    if ("stack" in exception && typeof exception.stack === "string") {
      normalizedException.stack = exception.stack;
    }
  } else {
    normalizedException = new Error(String(exception));
  }

  return normalizedException;
}
