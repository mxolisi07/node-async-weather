# Node Async Weather

A simple Node.js and TypeScript console app that shows the weather and the latest news headlines at the same time. The same job is written three times, using **Callbacks**, **Promises** and **Async/Await**, so the three styles can be compared side by side. It uses the built-in `https` module (no frameworks) and handles errors in one consistent format.

## Use-case Scenario

- A user wants to see the weather in their location.
- They also want to see the latest news headlines at the same time.
- Data is fetched asynchronously from external APIs.
- The app implements the same functionality using:
  - Callbacks
  - Promises
  - Async/Await (try...catch)

## Features

- **Weather Data:** Fetched from the Open-Meteo API.
- **News Headlines:** Fetched from the DummyJSON Posts API.
- **Callback Version:** Nested callbacks, including a "callback hell" example with dependent calls.
- **Promise Version:** Promise chaining with `.then()` and `.catch()`.
- **Async/Await Version:** The same logic written as normal top-to-bottom code with `try...catch`.
- **Promise.all():** Runs the weather and news requests at the same time and waits for both.
- **Promise.race():** Runs both requests at the same time and returns the fastest response.
- **Consistent Error Handling:** Every version prints errors in the same readable format.
- **Safe Requests:** Bad HTTP statuses (404, 500, ...), unreadable data and 10-second timeouts are all handled.

## Technologies Used

- **Node.js:** JavaScript runtime, using the built-in `https` module.
- **TypeScript:** Static typing for the whole project.
- **ts-node and nodemon:** Run TypeScript directly and restart on file changes during development.
- **Open-Meteo API:** Free weather data, no API key needed.
- **DummyJSON API:** Free fake posts (used as news headlines) and users.

## Project Structure

```
src/
├── config/
│   └── constants.ts         # Coordinates and API URLs
├── services/
│   ├── apiCallback.ts       # getWeather, getNews, getAuthor (callbacks)
│   └── apiPromise.ts        # getWeather, getNews, getAuthor (promises)
├── types/
│   └── index.ts             # Callback, Weather, News, Post, User types
├── utils/
│   ├── errorHandler.ts      # httpError, getErrorMessage, showError
│   ├── httpCallback.ts      # getData() using callbacks
│   └── httpPromise.ts       # getData() returning a Promise
├── callbackVersion.ts       # Sprint 2: callbacks and callback hell
├── promiseVersion.ts        # Sprint 3: chaining, Promise.all, Promise.race
└── asyncAwaitVersion.ts     # Sprint 4: async/await with try...catch
```

## Installation

1. Clone the repository:

```
git clone https://github.com/mxolisi07/node-async-weather.git
```

2. Navigate to the project directory:

```
cd node-async-weather
```

3. Install the dependencies:

```
npm install
```

## Usage

Run one version at a time:

```
npm run callback
npm run promise
npm run async
```

Run all three versions in order:

```
npm run all
```

Run all three and re-run every time you save a file (development):

```
npm run dev
```

The scripts in `package.json`:

```json
"scripts": {
  "callback": "ts-node src/callbackVersion.ts",
  "promise": "ts-node src/promiseVersion.ts",
  "async": "ts-node src/asyncAwaitVersion.ts",
  "all": "npm run callback && npm run promise && npm run async",
  "dev": "nodemon --watch src -e ts --exec \"npm run all\""
}
```

**Note:** The weather location is set by `LATITUDE` and `LONGITUDE` in `src/config/constants.ts`. Change them to your own coordinates.

## APIs Used

| Purpose | Endpoint |
| --- | --- |
| Weather | `https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current_weather=true` |
| News headlines | `https://dummyjson.com/posts?limit=3` |
| Author of a post | `https://dummyjson.com/users/:id` |

## The Three Styles Compared

| | Callbacks | Promises | Async/Await |
| --- | --- | --- | --- |
| File | `callbackVersion.ts` | `promiseVersion.ts` | `asyncAwaitVersion.ts` |
| Dependent calls | Nested deeper each step | Flat `.then()` chain | Normal top-to-bottom code |
| Error handling | `if (error)` at every level | One `.catch()` for the chain | One `try...catch` |
| Run requests together | Needs extra code | `Promise.all()` | `await Promise.all()` |
| Fastest response | Needs extra code | `Promise.race()` | `await Promise.race()` |
| Readability | Hardest (callback hell) | Better | Easiest |

## Error Handling

All three versions use the same `showError(where, error)` function, so every error looks the same. The "Where" line shows the version, the example and the step that failed.

```
[ERROR]
  Where:   Promise - Example 2 - Promise.all()
  Message: Request failed with status 404 (https://dummyjson.com/posts?limit=3)
```

| Problem | Message shown |
| --- | --- |
| No internet or server not found | Could not reach the server. Check your internet connection. |
| Connection dropped | The connection was lost. Please try again. |
| Bad HTTP status (for example 404) | Request failed with status 404 (url) |
| Slow server | Request timed out after 10 seconds |
| Data is not valid JSON | The server sent data we could not read. |
| No headlines returned | No news headlines were found. |

## Sample Console Output

The temperature and headlines come from live APIs, so your values will be different.

### Callbacks (`npm run callback`)

```
--- Example 1: Simple callbacks ---
Temperature: 9.8 °C
Headlines:
- His mother had always taught him
- He was an expert but not in a discipline
- Dave watched as the forest burned up on the hill.

--- Example 2: Callback hell ---
Step 1 - Temperature: 9.8 °C
Step 2 - First headline: His mother had always taught him
Step 3 - Written by: Ava Harris
```

### Promises (`npm run promise`)

```
--- Example 1: Promise chaining ---
Step 1 - Temperature: 9.8 °C
Step 2 - First headline: His mother had always taught him
Step 3 - Written by: Ava Harris

--- Example 2: Promise.all() ---
Temperature: 9.8 °C
Headlines:
- His mother had always taught him
- He was an expert but not in a discipline
- Dave watched as the forest burned up on the hill.

--- Example 3: Promise.race() ---
Weather won: 9.8°C

Done (Promise version).
```

### Async/Await (`npm run async`)

```
--- Example 1: async/await ---
Step 1 - Temperature: 9.8 °C
Step 2 - First headline: His mother had always taught him
Step 3 - Written by: Ava Harris

--- Example 2: Promise.all() ---
Temperature: 9.8 °C
Headlines:
- His mother had always taught him
- He was an expert but not in a discipline
- Dave watched as the forest burned up on the hill.

--- Example 3: Promise.race() ---
News won: His mother had always taught him

Done (Async/Await version).
```

**Note:** In Example 3, either "Weather won" or "News won" can appear. The winner depends on which request finishes first, so it can change from run to run.

## Testing

Run each command from the project folder and check the output against the table.

| # | Command / Action | Expected |
| --- | --- | --- |
| 1 | `npm run callback` | Example 1 and Example 2 print, no errors |
| 2 | `npm run promise` | Examples 1, 2 and 3 print, then "Done (Promise version)." |
| 3 | `npm run async` | Examples 1, 2 and 3 print, then "Done (Async/Await version)." |
| 4 | `npm run all` | All three versions run in order |
| 5 | Run `npm run promise` a few times | The Promise.race() winner can change |
| 6 | Turn off the internet, run `npm run all` | "Could not reach the server" error in every example |
| 7 | Change `NEWS_URL` to `.../postss?limit=3`, run `npm run all` | 404 error in the news steps only |
| 8 | Restore `NEWS_URL` and run `npm run all` | Everything works again |

## Learning Outcomes

- Understand why asynchronous code is needed when fetching data from external APIs.
- Use the built-in `https` module to make GET requests and read JSON responses.
- Write error-first callbacks and see how nested callbacks lead to "callback hell".
- Create Promises with `resolve` and `reject`, and chain them with `.then()` and `.catch()`.
- Run requests at the same time with `Promise.all()` and get the fastest result with `Promise.race()`.
- Refactor Promise code into `async/await` and handle errors with `try...catch`.
- Organise a TypeScript project into `types`, `config`, `utils` and `services`.
- Handle errors in one consistent, readable format across all three styles.