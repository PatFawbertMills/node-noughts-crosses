# node-noughts-crosses

Simple programming challenge written in node and typescript including unit tests.

Be sure to read the available scripts below to understand how to run the project.

Also run `npm i` before doing aynthing else ;)

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].


## Available Scripts

- `start` - run the game runner with a selection of pre-built boards (**note: you need to run build before this**)
- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

If you want to run your own boards against the code, either edit the package.json `start` script or run:
```
node build/src/main.js XO_board
```
... and replace `XO_board` with your board. You can include as many arguements as you like, just separate them with a space.

There are a selection of boards in the test file too.

### Template

Templated from the [node-typescript-boilerplate](https://github.com/jsynowiec/node-typescript-boilerplate)