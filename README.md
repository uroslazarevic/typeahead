# Typeahead

The Typeahead Component is a versatile UI element that facilitates efficient item selection as users type. It offers regular search, multiselect capabilities, and asynchronous search with caching to enhance user interaction and reduce server load. Easily integrate this component into your web applications for a more responsive and intuitive user experience.

![Typeahead localhost](/public/assets/typeahead-localhost.png)

## Usage

### BasicTypeahead

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BasicTypeahead } from './Typeahead';
import options from './options'

const App = () => {
    const [value, setValue] = useState('');

    return (
         <BasicTypeahead onValueChange={setValue} options={options} />
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### MultiSelectTypeahead

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MultiSelectTypeahead } from './Typeahead';
import options from './options'

const App = () => {
    const [value, setValue] = useState('');
    const [selections, setSelections] = useState<string[]>([]);

    return (
         <MultiSelectTypeahead
            onValueChange={setValue}
            onSelectionChange={setSelections}
            options={options}
          />
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### AsyncTypeahead

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AsyncTypeahead } from './Typeahead';
import options from './options'

const App = () => {
    const [value, setValue] = useState('');

    const handleSearch = () => {
        ... async call
    }

    return (
          <AsyncTypeahead
            onValueChange={setValue}
            onSearch={handleSearch}
            debounceTimeMS={250}
            options={options}
          />
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## Getting Started

This project was bootstrapped with [Vite](https://vitejs.dev/).

## Run following commands in your terminal to kick-start the project in DEV mode

1. `git clone https://github.com/uroslazarevic/typeahead.git` -> clone project
2. `cd typeahead` -> enter the newly cloned project
3. `yarn` -> install all node_modules
4. `yarn dev` -> run the dev server

## Run the following command in your terminal to start the project in Docker environment

1. `yarn compose:up ` or `yarn compose:restart` -> Runs the app in the dev or production mode in Docker container.
2. Open [http://localhost:8080/](http://localhost:8080/) to view app in production mode in the browser.
3. Open [http://localhost:8081/](http://localhost:8081/) to view app in development mode in the browser.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Runs the test suites in the project.

### `yarn build`

Builds the app for production in the `dist` folder.

### `yarn preview`

Runs the app in the production mode.
Open [http://localhost:4173/](http://localhost:4173/) to view it in the browser.

### `yarn compose:up ` or `yarn compose:restart`

Runs the app in the production mode in Docker container mapped to the port 8000.
Open [http://localhost:8080/](http://localhost:8080/) to view it in the browser.

### `yarn format`

Formats all source files with prettier.

### `yarn lint`

Lints all errors and warning in the project according to `.eslintrc.json` configuration file.
