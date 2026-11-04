import https from "https";
import { httpError } from "./errorHandler";

export function getData<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
      const status = res.statusCode || 0;

      if (status < 200 || status >= 300) {
        res.resume(); 
        reject(httpError(status, url));
        return;
      }

      let text = "";

      res.on("data", (piece) => {
        text += piece;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(text));
        } catch (err) {
          reject(new Error("The server sent data we could not read."));
        }
      });
    });

    request.setTimeout(10000, () => {
      request.destroy(new Error("Request timed out after 10 seconds"));
    });

    request.on("error", (err) => {
      reject(err);
    });
  });
}