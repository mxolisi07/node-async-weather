export type Callback<T> = (error: Error | null, data: T | null) => void;

export interface Weather {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
}

export interface Post {
  id: number;
  title: string;
  userId: number;
}

export interface News {
  posts: Post[];
}

export interface User {
  firstName: string;
  lastName: string;
}