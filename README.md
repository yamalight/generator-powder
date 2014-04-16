# generator-powder

Generator for scaffolding out Powder.js applications

## Getting Started

### Installation

```
$ npm install -g yo generator-powder
```

### Usage

```
$ yo powder
```

### API

`$ yo kraken`  
Creates a new powder application.

`$ yo kraken:controller myController`  
Generates a new controller named *myController* and it's dependencies.

## Learning Your Way Around

Once installed, you can create a basic application by following the prompts.

```shell
$ yo powder

     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

You're using the fantastic Powder generator.
[?] What do you want to call your app?
...
```

To run your application, just go into the newly created directory and type `gulp`.

```shell
$ cd HelloWorld
$ gulp

...

listening on port 8080
```

### Project Structure

- **/app/** - Application and middleware configuration
- **/controllers/** - Application routes
- **/db/** - Database config and model definitions
- **/gulp/** - Gulp configuration files
- **/lib/** - Express.js route loader
- **/modules/** - Server-side user modules
- **/public/css/** - CSS files
- **/public/img/** - Client-side image files
- **/public/js/app.js - Client-side javascript bootstrapper
- **/public/js/controllers.js - Angular controllers loader
- **/public/js/directives.js - Angular directives loader
- **/public/js/filters.js - Angular filters loader
- **/public/js/routes.js - Angular routes
- **/public/js/services.js - Angular services loader
- **/public/js/controllers/** - Angular controllers
- **/public/js/data/** - Supplementary data
- **/public/js/directives/** - Custom angular directives
- **/public/js/filters/** - Custom angular filters
- **/public/js/modules/** - Client-side user modules
- **/public/js/services/** - Custom angular services
- **/public/templates/** - Browser-side angular templates
- **/tests/** - Unit and functional test cases
- **/views/** - Server-side dust.js templates
- **/app.js** - Application entry point
- **/config.js** - Application config
- **/gulpfile.js** - Gulp bootstrapper


### TODO

Add more docs and subgenerators.

## License

MIT
