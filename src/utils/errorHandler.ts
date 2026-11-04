export function httpError(status: number, url: string): Error {
  return new Error("Request failed with status " + status + " (" + url + ")");
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOTFOUND" || code === "EAI_AGAIN") {
      return "Could not reach the server. Check your internet connection.";
    }
    if (code === "ECONNRESET") {
      return "The connection was lost. Please try again.";
    }
    return error.message;
  }
  return String(error);
}

export function showError(where: string, error: unknown) {
  console.log("\n[ERROR]");
  console.log("  Where:   " + where);
  console.log("  Message: " + getErrorMessage(error));
  console.log("");
}