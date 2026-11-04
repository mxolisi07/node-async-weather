import https from "https";

export function getData<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let text = "";

        res.on("data", (piece) => {
          text += piece;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(text));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}