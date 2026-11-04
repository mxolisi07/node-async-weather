import { getWeather, getNews, getAuthor } from "./services/apiPromise";

export function runPromiseVersion(): Promise<void> {

  console.log("--- Promise Example 1: Promise chaining ---");

  return getWeather()
    .then((weather) => {
      console.log("Step 1 - Temperature:", weather.current_weather.temperature, "°C");
      return getNews();
    })
    .then((news) => {
      const firstPost = news.posts[0];
      if (!firstPost) {
        throw new Error("No news posts found");
      }
      console.log("Step 2 - First headline:", firstPost.title);
      return getAuthor(firstPost.userId);
    })
    .then((author) => {
      console.log("Step 3 - Written by:", author.firstName, author.lastName);
    })
    .catch((error) => {
      console.log("Something went wrong:", error.message);
    })
    .then(() => {
      console.log("\n--- Promise Example 2: Promise.all() ---");

      return Promise.all([getWeather(), getNews()])
        .then(([weather, news]) => {
          console.log("Temperature:", weather.current_weather.temperature, "°C");
          console.log("Headlines:");
          news.posts.forEach((post) => console.log("-", post.title));
        })
        .catch((error) => {
          console.log("Promise.all error:", error.message);
        });
    })
    .then(() => {
      console.log("\n--- Promise Example 3: Promise.race() ---");

      return Promise.race([
        getWeather().then((weather) => "Weather won: " + weather.current_weather.temperature + "°C"),
        getNews().then((news) => {
          const firstPost = news.posts[0];
          if (!firstPost) {
            throw new Error("No news posts found");
          }
          return "News won: " + firstPost.title;
        }),
      ])
        .then((winner) => {
          console.log(winner);
        })
        .catch((error) => {
          console.log("Promise.race error:", error.message);
        });
    });
}

if (require.main === module) {
  runPromiseVersion().then(() => console.log("\nDone (Promise version)."));
}