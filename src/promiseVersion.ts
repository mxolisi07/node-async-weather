import { getWeather, getNews, getAuthor } from "./services/apiPromise";
import { showError } from "./utils/errorHandler";

console.log("--- Example 1: Promise chaining ---");

getWeather()
  .then((weather) => {
    console.log("Step 1 - Temperature:", weather.current_weather.temperature, "°C");
    return getNews();
  })
  .then((news) => {
    const firstPost = news.posts[0];
    if (!firstPost) {
      throw new Error("No news posts available");
    }
    console.log("Step 2 - First headline:", firstPost.title);
    return getAuthor(firstPost.userId);
  })
  .then((author) => {
    console.log("Step 3 - Written by:", author.firstName, author.lastName);
  })
  .catch((error) => {
    showError("Promise - Example 1 - chain", error);
  })
  .then(() => {
    console.log("\n--- Example 2: Promise.all() ---");

    return Promise.all([getWeather(), getNews()])
      .then(([weather, news]) => {
        console.log("Temperature:", weather.current_weather.temperature, "°C");
        console.log("Headlines:");
        news.posts.forEach((post) => console.log("-", post.title));
      })
      .catch((error) => {
        showError("Promise - Example 2 - Promise.all()", error);
      });
  })
  .then(() => {
    console.log("\n--- Example 3: Promise.race() ---");

    return Promise.race([
      getWeather().then((weather) => "Weather won: " + weather.current_weather.temperature + " °C"),
      getNews().then((news) => "News won: " + (news.posts[0]?.title ?? "No headlines")),
    ])
      .then((winner) => {
        console.log(winner);
      })
      .catch((error) => {
        showError("Promise - Example 3 - Promise.race()", error);
      });
  })
  .then(() => {
    console.log("\nDone (Promise version).");
  });