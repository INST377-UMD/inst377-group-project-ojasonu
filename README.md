<div align="center">
    <h1>Lyric Finder</h1>
    <h2>This project aims to facilitate the enjoyment of music across various languages<h2>
    <h3>Authors: Yunlong Ou, Edward Halili, Daniel Lobaccaro</h3>
</div>
      
## Overview    
There are thousands of languages worldwide and only one is universally understood. Music diffuses cultural and linguistic differences no matter where someone may come from or what languages they understand. Music can be enjoyed even if a listener doesn't speak the same language as the artist. However, most lyrics are vital to a complete appreciation of a musical piece. This website allows users to input any song they want and translate it into any language. This project can serve as an educational and cultural development tool. 

## Target Browsers
Lyrics Finder supports:
- **Desktop Browsers:** Chrome, Firefox, Edge, and Safari (latest versions)

## Documentation Links
* [User Manual](#user-manual)
* [Developer Manual](#developer-manual)

## User Manual
Make sure you are using a modern browser (chrome, firefox, edge, safari) and have Node.js installed (https://nodejs.org/en)
- Clone it to your laptop: git clone https://github.com/ehalili-umd/INST377-Group-Project.git

Since the site is not deployed you must access it locally through the server provided.
- Open a new terminal or command prompt where this project is located
- Install dependencies (do this after you clone the repo): `npm i`
- Start the server with `npm start` (close server with `ctrl+c`)
- Access the main page in your browser with `http://localhost:4000/index.html`
- Access the about page in your browser with `http://localhost:4000/about.html`

With the website open:
- Input your desired song in the 'Song Title' box
- To differentiate between songs with shared titles, input the song title followed by the artist name
- Select a language from the 'Choose a language' drop-down
- Hit the 'Get Lyrics' button

At the top of the page:
- There is a navigation bar that takes you to the home page and about page.

At the bottom of the page:
- There is a table that tracks what song and languages you have chosen
## Examples
<img src="https://github.com/ehalili-umd/INST377-Group-Project/blob/main/public/example.png" width="80%">

## Developer Manual

### Audience
This document is intended for future developers and maintainers of Lyrics Finder.

### Prerequisites
Familiarity with web applications, JavaScript, Node.js, HTML, and CSS.

### JS Library & API used
#### JS Library:
* [Typed.js](https://github.com/mattboldt/typed.js)
#### API: 
* [Language Selection](https://libretranslate.com/languages)
* [lyric](https://some-random-api.com)
* [Google Translation](https://cloud.google.com/translate?hl=en)

### Installation and Setup
- Install dependencies (do this after you clone the repo): `npm i`
- Start the web application: `npm start`
- Stop the web application: `CTRL + C` in the terminal
### Running the Application
- Start the server: `npm start`
- Access at 'http://localhost:4000/index.html'
### Running Tests
- Execute `npm test` for the test suite.
### API Endpoints (server.js)
#### GET/:
- Serves the main page of the application.
- Responds with 'index.html' from the public directory.
#### GET/index:
- Retrieves the lyric history.
- Interacts with the Supabase database, fetching entries from the lyricHistory table.
- Returns data in JSON format or logs an error if encountered.
#### GET/about:
- access to the About page.
#### POST/index:
- Adds a new lyric entry to the lyric history.
- Accepts songTitle and language in the request body.
- Inserts the new entry into the lyricHistory table in Supabase.
- Responds with the inserted data or an error message.
#### Additional Notes:
- The application uses Express.js for server-side operations.
- bodyParser.json() middleware is used to parse JSON request bodies.
- The Supabase client is configured for database interactions.
- The server listens on port 4000.

### Client-Side Script.js Overview

#### Language Selection
- **Function:** `populateLanguageDropdown`
- **Description:** Fetches available languages from LibreTranslate and populates the language selection dropdown.

#### Lyrics Search and Display
- **Function:** `fetchLyrics`
- **Description:** Fetches lyrics for a given song title from an external API and displays them.

#### Lyrics Translation
- **Function:** `translateLyrics`
- **Description:** Translates the displayed lyrics using the Google Translation API.

#### Lyric History Display
- **Function:** `getLyricHistory`
- **Description:** Retrieves and displays the history of searched lyrics from the server.

#### Adding Lyrics to History
- **Function:** `addLyric`
- **Description:** Posts new lyric entries to the server and updates the lyric history display.

#### Client-Side Animations
- **Function:** `initializeTypedAnimations`
- **Description:** Implements animated text elements on the page using Typed.js library.

### Known Bugs and Future Development Roadmap

#### Known Bugs

1. **Inconsistent Formatting in Translations:** The format of the translated lyrics may not always match the format of the original lyrics.
2. **Translation Nuances:** The translation feature might not accurately convey the nuances of certain languages, leading to potential loss of meaning or context.

### Future Development Roadmap

1. **Format Consistency:** Improve the formatting algorithm for translated lyrics.
2. **Advanced Translation Features:** Integrate a more nuanced translation engine to better capture linguistic subtleties.
3. **User Interface Enhancements:** Upgrade the UI for better responsiveness and user experience.
4. **Feature Additions:** Consider adding features such as user playlists and song recommendations.
