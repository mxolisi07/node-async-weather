import { getData } from "../utils/httpPromise";
import { WEATHER_URL, NEWS_URL, USER_URL } from "../config/constants";
import { Weather, News, User } from "../types";

export function getWeather(): Promise<Weather> {
  return getData<Weather>(WEATHER_URL);
}

export function getNews(): Promise<News> {
  return getData<News>(NEWS_URL);
}

export function getAuthor(userId: number): Promise<User> {
  return getData<User>(USER_URL + userId);
}