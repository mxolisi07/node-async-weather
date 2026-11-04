import { getWeather, getNews, getAuthor } from "./services/apiCallback";
import { showError } from "./utils/errorHandler";

console.log("--- Example 1: Simple callbacks ---");

getWeather((error, weather) => {
  if (error || !weather) {
    showError("Callback - Example 1 - weather", error);
    return;
  }
  console.log("Temperature:", weather.current_weather.temperature, "°C");

  getNews((error, news) => {
    if (error || !news) {
      showError("Callback - Example 1 - news", error);
      return;
    }
    console.log("Headlines:");
    news.posts.forEach((post) => console.log("-", post.title));

    console.log("\n--- Example 2: Callback hell ---");

    getWeather((error, weather) => {
      if (error || !weather) {
        showError("Callback - Example 2 - step 1 (weather)", error);
        return;
      }
      console.log("Step 1 - Temperature:", weather.current_weather.temperature, "°C");

      getNews((error, news) => {
        if (error || !news) {
          showError("Callback - Example 2 - step 2 (news)", error);
          return;
        }
        const firstPost = news.posts[0];
        if (!firstPost) {
          showError("Callback - Example 2 - step 2 (news)", new Error("No news posts available"));
          return;
        }
        console.log("Step 2 - First headline:", firstPost.title);

        getAuthor(firstPost.userId, (error, author) => {
          if (error || !author) {
            showError("Callback - Example 2 - step 3 (author)", error);
            return;
          }
          console.log("Step 3 - Written by:", author.firstName, author.lastName);
        });
      });
    });
  });
});