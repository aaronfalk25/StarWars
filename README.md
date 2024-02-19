# Star Wars Character Search

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This is a single page "profile page" for various Star Wars characters in the Star Wars universe.

## Functionality
This project pulls from [https://swapi.dev/](https://swapi.dev/) to obtain Star Wars universe data. This app implements
a caching mechanism so that every time the web page is loaded, it will check local storage for character data.

The user can enter their search term in the input box, where upon pressing Enter or clicking the "Search" button, the cached data is checked before then making an API call to retrieve information on the character and their films, starships, and homeworld.

## Components
This application makes use of the following components:
1. **Alert** - an alert provides information to the user in a custom message. The alert appears on the bottom of the screen in a red box.
2. **Loading** - the loading component is a wrapper for a custom loading widget from the 'react-spinners' package.
3. **Modal** - a modal appears overtop a page, obfuscating the background and functioning as a pop-up. The modal is used for additional character data such as films, starships, and homeworld.
4. **Profile** - the profile component takes in a Character object as props and renders that character information.
5. **Search** - the search component takes a character mapping as input and returns search results that can be then processed in a search callback. Additionally, all input validation is handled through the search component, ensuring proper length and that results are found.

## Getting Started

In the project directory, you can run:
### `npm i`
to install necessary dependencies, then
### `npm start`
to launch the application on [http://localhost:3000](http://localhost:3000) (or another available port, if 3000 is occupied).
