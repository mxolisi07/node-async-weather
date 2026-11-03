import { getWeather, getNews, getAuthor } from "./services/apiCallback";

// Example 1: Weather, then news
console.log("--- Example 1: Simple callbacks ---");

getWeather((error, weather) => {
  if (error || !weather) {
    console.log("Weather error:", error?.message);
    return;
  }
  console.log("Temperature:", weather.current_weather.temperature, "°C");

  getNews((error, news) => {
    if (error || !news) {
      console.log("News error:", error?.message);
      return;
    }
    console.log("Headlines:");
    news.posts.forEach((post) => console.log("-", post.title));

    // Example 2: Callback hell
    // Each call needs the result of the one before it,
    // so the code keeps moving to the right.
    console.log("\n--- Example 2: Callback hell ---");

    getWeather((error, weather) => {
      if (error || !weather) {
        console.log("Weather error:", error?.message);
        return;
      }
      console.log("Step 1 - Temperature:", weather.current_weather.temperature, "°C");

      getNews((error, news) => {
        if (error || !news) {
          console.log("News error:", error?.message);
          return;
        }
        const firstPost = news.posts[0];
        if (!firstPost) {
          console.log("News error: No posts found");
          return;
        }
        console.log("Step 2 - First headline:", firstPost.title);

        getAuthor(firstPost.userId, (error, author) => {
          if (error || !author) {
            console.log("Author error:", error?.message);
            return;
          }
          console.log("Step 3 - Written by:", author.firstName, author.lastName);
        });
      });
    });
  });
});