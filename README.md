# generator-powder

Generator for scaffolding out Powder.js single page web applications

## About Powder.js

Powder.js is a combination of existing frameworks, tools and libraries that allows fast and simple single page web applications creation.  

Optional server-side of powder.js is powered by [Express.js](http://expressjs.com/).  
Express utilizes CSRF tokens via [csurf](https://github.com/expressjs/csurf) as well as [Helmet](https://github.com/evilpacket/helmet) middleware with basic config for increased security.  
Server-side templating is done via Linkedin version of [Dust.js](http://linkedin.github.io/dustjs/).  

Client-side is built using [Angular.js](http://angularjs.org/) with ngRoute, [Twitter Bootstrap CSS](http://getbootstrap.com/) and [UI Bootstrap directives](http://angular-ui.github.io/bootstrap/).  
All the client-side app code is managed and compiled by [Browserify](http://browserify.org/) and minified using [Uglify.js](https://github.com/mishoo/UglifyJS2) (when not in debug mode). All this and more is performed by [browserify-middleware](https://github.com/ForbesLindesay/browserify-middleware) on the fly when using optional server-side, or by gulp when just using the client-side.  
[Bower](http://bower.io/) is used for the client-side dependencies which are bundled together into `vendor.min.js` by gulp and loaded directly from core template.  

[Gulp.js](http://gulpjs.com/) is used as a build-tool.  
Testing is done using [jshint](http://www.jshint.com/) and [jscs](https://github.com/mdevils/node-jscs) for linting and code-style and [mocha.js](http://visionmedia.github.io/mocha/) with [should.js](https://github.com/visionmedia/should.js/) for automated testing.  
Default test suite includes two different test files - one for API using simple JSON, and one for browser using [zombie.js](http://zombie.labnotes.org/).  
[Bunyan](https://github.com/trentm/node-bunyan) is used as a logger. Logs can be found in `./logs/` folder.  
Powder.js can (optionally) automatically init git repository and commit all generated files for simpler project management.

## Getting Started

### Requirements

For powder.js to function properly, you'll need to have following things installed:

* [Node](http://nodejs.org/) v0.10+
* [NPM](https://npmjs.org/) v1.4+
* [gulp](http://gulpjs.com/)

Alternatively you can use [vagrant](http://www.vagrantup.com/) environment provided by `powder:vagrant` generator, it includes all the required packages.  
Or [docker](https://www.docker.com/) environment provided by `powder:docker` generator.  
Please note, both docker and vagrant assume you have server-side in generated project.
If not, you will have to modify the environments yourself.

### Installation

```
$ npm install -g yo generator-powder
```

### Usage

```
$ yo powder
```

### API

`$ yo powder`  
Creates a new powder.js application.

`$ yo powder:db myName`  
Generates a new server-side mongodb database named *myName* and installs all the needed dependencies in main app.

`$ yo powder:module myName`  
Generates a new angular client-side module named *myName* and injects it into main app.
Module can consists of controller, directive, service and filter. Or just any one of those.

`$ yo powder:model myName`  
Generates a new mongoose model named *myName* and injects it into main app.

`$ yo powder:vagrant`  
Generates a [vagrant](http://www.vagrantup.com/) environment for the project with all the requirements included.

`$ yo powder:docker`  
Generates a [docker](https://www.docker.com/) environment for the project with all the requirements included.

## Learning Your Way Around

Once installed, you can create a basic application by following the prompts.

```shell
$ mkdir HelloWorld
$ cd HelloWorld
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

To run your application, just type `gulp`.

```shell
$ gulp
...

listening on port 8080
```

### Project Structure

Client:
- **/client/css/** - CSS files
- **/client/js/app.js** - Client-side javascript app entry point bootstrapper
- **/client/js/bootstrap.js** - Client-side javascript app bootstrapper
- **/client/navigation/** - Default navigation bar directive module
- **/client/index/** - Default home page controller module

Client module (can be generated with `powder:module`):
- **/client/MODULE/index.js** - Client-side app module bootstrapper
- **/client/MODULE/controller.js** - Client-side app angular controller
- **/client/MODULE/template.html** - Client-side app angular controller template
- **/client/MODULE/directive.js** - Client-side app angular directive (optional)
- **/client/MODULE/directive-controller.js** - Client-side app angular directive controller (optional)
- **/client/MODULE/directive-template.html** - Client-side app angular directive template (optional)
- **/client/MODULE/filter.js** - Client-side app angular filter
- **/client/MODULE/service.js** - Client-side app angular service

Server (optional):
- **/server/index.js** - Server application entry point
- **/server/app/** - Server application and middleware configuration
- **/server/controllers/** - Server application routes
- **/server/models/** - Database config and models definitions (if generated with `powder:db`)
- **/server/lib/** - Express.js route loader
- **/server/logger/** - Bunyan-based logger
- **/server/views/** - Server-side dust.js templates

Misc:
- **/logs/** - Server application log files
- **/tools/gulp/** - Gulp configuration files
- **/tools/tests/** - Unit and functional tests
- **/config.js** - Application config
- **/gulpfile.js** - Gulp bootstrapper

### Controllers

Route logic is moved into the `/server/controllers/` directory and its subdirectories.  
For the sake of simplicity `/server/controllers/` directory has two default subdirectories: `/controllers/api/` and `/controllers/main/`.

For example, a route for your page, would use a `/controllers/main/index.js` file such as:

```js
module.exports = function(app) {
    // index
    app.get('/*', function(req, res) {
        return res.render('index');
    });
};
```

This file would define the route and the logic for the main application page. The advantage of keeping routes and logic segregated in individual files starts to show as the application grows. If something fails, it's very easy to pinpoint where things went wrong.

### Models

Data models are separated from the controller logic resulting in cleaner, more organized code. Data models live in the `/server/models/` folder if you have used `powder:db` subgenerator.

### Templates

[Dust JavaScript templates](https://github.com/linkedin/dustjs) are the default server-side templating language.
[Angular templates] are used in client-side.

Server-side templates are loaded from the `/server/views/` directory.  
Client-side templates are loaded from the `/client/js/MODULE/templates/` directory.

### POST requests

Since Powder.js utilizes CSRF tokens for increased security, to send POST request that will be accepted you need to include this token.  
To do that you have to pass token from server into your template (or javascript request). The token can be retrieved from `csrf` variable and is by default exposed as `window.csrf`.  
Request must contain the token in `_csrf` field.  
For example, you can include it in template like this: `<input type="hidden" name="_csrf" value="{csrf}" />`

### Async/await

It is recommended to utilize [Asyncawait](https://github.com/yortus/asyncawait) and promises (using [bluebird](https://github.com/petkaantonov/bluebird)) to simplify asynchronous code within the server-side application.  

This allows simplifying this code which is considered your typical js callback hell:  
```js
function foo(callback) {
    firstAsyncCall(function (err, resultA) {
        if (err) { callback(err); return; }
        secondAsyncCallUsing(resultA, function (err, resultB) {
            if (err) { callback(err); return; }
            thirdAsyncCallUsing(resultB, function (err, resultC) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, doSomethingWith(resultC));
                }
            });

        });
    });
}
```

To simple and readable code like this:  
```js
var foo = async (function() {
    var resultA = await (firstAsyncCall());
    var resultB = await (secondAsyncCallUsing(resultA));
    var resultC = await (thirdAsyncCallUsing(resultB));
    return (doSomethingWith(resultC));
});
```

Note that await function will only work with functions that return promises.  
If you are using libraries or third-party functions that do not return promises, you can use bluebirds `.promisify()` or `.promisifyAll()` functions to turn them into promises and allow usage with asyncawait.

For more info, please refer to [asyncawait](https://github.com/yortus/asyncawait) and [bluebird](https://github.com/petkaantonov/bluebird) docs.

### Vagrant

You can quickly setup a [vagrant](http://www.vagrantup.com/) environment that includes all the required packages for powder.js app to work (assuming you have vagrant installed).  
It is recommended to generate powder.js app without initialization. Doing so will allow compiling all the depenend node modules inside of the vagrant box from the beginning thus saving you time.  
To do so, follow the steps below:  

1. Run `yo powder:vagrant` to generate all the required vagrant files
2. Run `vagrant up` to provision the box
3. Run `vagrant ssh` to open box shell
4. Use `cd /vagrant` to navigate to shared folder with app code
5. (optional) If you haven't initialized the app, run `npm install` to do so.
6. Run the app using `gulp` command

Please, note that if you chose to initialize the app from the beginning, you might need to remove `node_modules` folder and re-run `npm install` inside of a vagrant box to re-compile some of the node modules, otherwise you might get some warnings that are not critical (e.g. `Failed to load c++ bson extension, using pure JS version`).

### Docker

You can as well quickly setup a [docker](https://www.docker.com/) container that includes all the required packages for puwder.js app to work (assuming you have docker installed).  
It is recommended to generate powder.js app without initialization. Doing so will allow compiling all the depenend node modules inside of the docker container from the beginning thus saving you time.  
To do so, follow the steps below:  

1. Run `yo powder:docker` to generate all the required docker files
2. Run `docker build -t appname .` to generate new docker container
3. Run `docker run -i -t -p 8080:8080 appname` to launch generated container

Please, note that adding Dockerfile (running `powder:docker`) changes your package.json file and removes post-install directive from it.
It is done to allow docker to cache `npm install` and `bower install` steps so that if you change only your app files, you don't need to wait for these steps again.

### TODO

Add more docs, subgenerators and a proper test suite.

## License

[MIT](http://opensource.org/licenses/MIT)
