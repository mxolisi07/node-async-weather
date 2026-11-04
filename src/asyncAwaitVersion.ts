import { getWeather, getNews, getAuthor } from "./services/apiPromise";
import { showError } from "./utils/errorHandler";

async function main() {

  console.log("--- Example 1: async/await ---");

  try {
    const weather = await getWeather();
    console.log("Step 1 - Temperature:", weather.current_weather.temperature, "°C");

    const news = await getNews();
    const firstPost = news.posts[0];
    if (!firstPost) {
      throw new Error("No news posts available.");
    }
    console.log("Step 2 - First headline:", firstPost.title);

    const author = await getAuthor(firstPost.userId);
    console.log("Step 3 - Written by:", author.firstName, author.lastName);
  } catch (error) {
    showError("Async/Await - Example 1 - chain", error);
  }

  console.log("\n--- Example 2: Promise.all() ---");

  try {
    const [weather, news] = await Promise.all([getWeather(), getNews()]);
    console.log("Temperature:", weather.current_weather.temperature, "°C");
    console.log("Headlines:");
    news.posts.forEach((post) => console.log("-", post.title));
  } catch (error) {
    showError("Async/Await - Example 2 - Promise.all()", error);
  }

  console.log("\n--- Example 3: Promise.race() ---");

  try {
    const winner = await Promise.race([
      getWeather().then((weather) => "Weather won: " + weather.current_weather.temperature + "°C"),
      getNews().then((news) => "News won: " + (news.posts[0]?.title ?? "No headlines")),
    ]);
    console.log(winner);
  } catch (error) {
    showError("Async/Await - Example 3 - Promise.race()", error);
  }

  console.log("\nDone (Async/Await version).");
}

main();