import { getWeather, getNews, getAuthor } from "./services/apiCallback";

export function runCallbackVersion(done: () => void) {

  console.log("--- Callback Example 1: Simple callbacks ---");

  getWeather((error, weather) => {
    if (error || !weather) {
      console.log("Weather error:", error?.message);
      return done();
    }
    console.log("Temperature:", weather.current_weather.temperature, "°C");

    getNews((error, news) => {
      if (error || !news) {
        console.log("News error:", error?.message);
        return done();
      }
      console.log("Headlines:");
      news.posts.forEach((post) => console.log("-", post.title));

      console.log("\n--- Callback Example 2: Callback hell ---");

      getWeather((error, weather) => {
        if (error || !weather) {
          console.log("Weather error:", error?.message);
          return done();
        }
        console.log("Step 1 - Temperature:", weather.current_weather.temperature, "°C");

        getNews((error, news) => {
          if (error || !news) {
            console.log("News error:", error?.message);
            return done();
          }
          const firstPost = news.posts[0];
          if (!firstPost) {
            console.log("News error: No headlines found.");
            return done();
          }
          console.log("Step 2 - First headline:", firstPost.title);

          getAuthor(firstPost.userId, (error, author) => {
            if (error || !author) {
              console.log("Author error:", error?.message);
              return done();
            }
            console.log("Step 3 - Written by:", author.firstName, author.lastName);
            done();
          });
        });
      });
    });
  });
}

if (require.main === module) {
  runCallbackVersion(() => console.log("\nDone (Callback version)."));
}