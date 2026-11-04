import https from "https";
import { Callback } from "../types";
import { httpError } from "./errorHandler";

export function getData<T>(url: string, callback: Callback<T>) {
  const request = https.get(url, (res) => {
    const status = res.statusCode || 0;

    if (status < 200 || status >= 300) {
      res.resume(); 
      callback(httpError(status, url), null);
      return;
    }

    let text = "";

    res.on("data", (piece) => {
      text += piece;
    });

    res.on("end", () => {
      try {
        callback(null, JSON.parse(text));
      } catch (err) {
        callback(new Error("The server sent data we could not read."), null);
      }
    });
  });

  request.setTimeout(10000, () => {
    request.destroy(new Error("Request timed out after 10 seconds"));
  });

  request.on("error", (err) => {
    callback(err, null);
  });
}