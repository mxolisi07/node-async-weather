import https from "https";
import { Callback } from "../types";

export function getData<T>(url: string, callback: Callback<T>) {
  https
    .get(url, (res) => {
      let text = "";

      res.on("data", (piece) => {
        text += piece;
      });

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