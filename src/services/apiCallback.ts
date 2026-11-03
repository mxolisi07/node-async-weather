import { getData } from "../utils/httpCallback";
import { WEATHER_URL, NEWS_URL, USER_URL } from "../config/constants";
import { Callback, Weather, News, User } from "../types";

export function getWeather(callback: Callback<Weather>) {
  getData<Weather>(WEATHER_URL, callback);
}

export function getNews(callback: Callback<News>) {
  getData<News>(NEWS_URL, callback);
}

export function getAuthor(userId: number, callback: Callback<User>) {
  getData<User>(USER_URL + userId, callback);
}