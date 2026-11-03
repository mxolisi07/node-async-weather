import https from "https";
import { Callback } from "../types";

// Gets data from a URL. When it is done, it calls the callback.
export function getData<T>(url: string, callback: Callback<T>) {
  https
    .get(url, (res) => {
      let text = "";

      // Collect the data in pieces
      res.on("data", (piece) => {
        text += piece;
      });

      // All data received: turn the text into an object
      res.on("end", () => {
        try {
          callback(null, JSON.parse(text));
        } catch (err) {
          callback(err as Error, null);
        }
      });
    })
    .on("error", (err) => {
      callback(err, null);
    });
}