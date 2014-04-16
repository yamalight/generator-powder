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

### Controllers

Route logic is moved into the `/controllers/` directory and its subdirectories.  
For the sake of simplicity `/controllers/` directory has two default subdirectories: `/controllers/api/` and `/controllers/main/`.

For example, a route for your home page, would use a `/controllers/main/index.js` file such as:

```js
// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: function(req, res) {
        return res.render('index');
    }
};
```

This file would define the routes and the logic for the home page. The advantage of keeping routes and logic segregated in individual files starts to show as the application grows. If something fails, it's very easy to pinpoint where things went wrong.

When a new controller is created, the generator will also create both client and server-side templates, routes and all needed client javascript files for you.

### Models

Data models are separated from the controller logic resulting in cleaner, more organized code. Data models live in the `/db/` folder.

### Templates

[Dust JavaScript templates](https://github.com/linkedin/dustjs) are the default server-side templating language.
[Angular templates] are used in client-side.

Server-side templates are loaded from the `/views/` directory.
Client-side templates are loaded from the `/public/templates/` directory.


### TODO

Add more docs and subgenerators.

## License

MIT
