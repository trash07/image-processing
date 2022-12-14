# Image processing API
The purpose of this project is to provide image processing

# API testing url
```bash
http://localhost:3000/api/images
```

Required query strings to work:
* **filename** => The name of the file (_encenadaport_, _fjord_,   _icelandwaterfall_,  _palmtunnel_,  _santamonica_ or any newly added filename without extension)
* **width** an integer value specifying the desired width (Example: 300)
* **height** an integer value specifying the desired height (Example: 200)

Example:
```shell
http://localhost:3000/api/images?filename=fjord&width=300&height=100
```

or 
```bash
curl http://localhost:3000/api/images?filename=fjord&width=300&height=100
```

# Commands
## Installing dependencies
To start using the project don't forget to run the following command.

```shell
npm install
```

## Running project (default server port is 3000)
### In dev mode (with nodemon and livereload)
```shell
npm run start:dev
```
### In production mode 
```shell
npm run start
```

## Testing, linting and prettier
To test the project, run the following command.

Things to check before running the command:
* npm is installed and running a recent version

```bash
npm run test
```

The test command runs linting, prettier and converts typescript to javascript.

The converted code is in the **dist** folder.

To lint separately type:

```bash
npm run lint
```

To run prettier separately run:

```bash
npm run prettier
```



