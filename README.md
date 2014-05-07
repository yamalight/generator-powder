# generator-powder

Generator for scaffolding out Powder.js applications

## About Powder.js

Powder.js is a combination of existing frameworks, tools and libraries that allows fast and simple web app creation.  
Server-side of powder.js is powered by [Express.js](http://expressjs.com/) with data and sessions stored in MongoDB accessed using [Mongoose.js](http://mongoosejs.com/).  
Express utilizes CSRF tokens via [csurf](https://github.com/expressjs/csurf) as well as [Helmet](https://github.com/evilpacket/helmet) middleware with basic config for increased security.  
Server-side templating is done via Linkedin version of [Dust.js](http://linkedin.github.io/dustjs/).  
If needed, basic local authorisation can be generated using [passport.js](http://passportjs.org/).  
Client-side is built using [Angular.js](http://angularjs.org/) with ngRoute, [Twitter Bootstrap](http://getbootstrap.com/), [AngularStrap](http://mgcrea.github.io/angular-strap/) and [jQuery](http://jquery.com/).  
All the client-side app code is managed and compiled by [Browserify](http://browserify.org/) and minified using [Uglify.js](https://github.com/mishoo/UglifyJS2) (when not in debug mode).  
[Bower](http://bower.io/) is used for the client-side dependencies which are loaded directly from core template. All dependencies available on CDNs might be replaced to those before deploying.  
[Gulp.js](http://gulpjs.com/) is used as a build-tool.  
In addition to build and testing tasks, gulp as well handles all the things related to encapsulating bower dependencies into project without any additional actions from the developer. It as well created version of layout with libraries located on CDN. If you'd like to include your own libraries, please add CDN locations to `gulp/tasks/cdn.js`.  
Testing is done using [jshint](http://www.jshint.com/) for linting and [mocha.js](http://visionmedia.github.io/mocha/) with [should.js](https://github.com/visionmedia/should.js/) for automated testing.  
Default test suite includes two different test files - one for API using simple JSON, and one for browser using [zombie.js](http://zombie.labnotes.org/).  
In addition, powder.js utilizes [asyncawait](https://github.com/yortus/asyncawait) and promises (using [bluebird](https://github.com/petkaantonov/bluebird)) to simplify asynchronous code.  
[Bunyan](https://github.com/trentm/node-bunyan) is used as a logger. Logs can be found in `./logs/` folder.  
Powder.js can (optionally) automatically init git repository and commit all generated files for simpler project management.

## Getting Started

### Requirements

For powder.js to function properly, you'll need to have following things installed:

* [Node](http://nodejs.org/) v0.10+
* [NPM](https://npmjs.org/) v1.4+
* [MongoDB](https://www.mongodb.org/) v2+

Alternatively you can use [vagrant](http://www.vagrantup.com/) environment that includes all the required packages provided by `powder:vagrant` generator.

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

`$ yo powder:controller myName`  
Generates a new server-side (optional) and client-side controller named *myNameController* and it's dependencies and injects it into main app.

`$ yo powder:directive myName`  
Generates a new angular directive named *myNameDirective* and injects it into main app.

`$ yo powder:filter myName`  
Generates a new angular filter named *myNameFilter* and injects it into main app.

`$ yo powder:service myName`  
Generates a new angular service named *myNameService* and injects it into main app.

`$ yo powder:model myName`  
Generates a new mongoose model named *myName* and injects it into main app.

`$ yo powder:vagrant`  
Generates a [vagrant](http://www.vagrantup.com/) environment for the project with all the requirements included.

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

To run your application, just type `gulp` (you need to have gulp installed globally with `npm -g gulp`, if not use gulp from node_modules with `./node_modules/.bin/gulp`).

```shell
$ gulp
...

listening on port 8080
```

### Project Structure

- **/app/** - Application and middleware configuration
- **/controllers/** - Application routes
- **/models/** - Database config and models definitions
- **/gulp/** - Gulp configuration files
- **/lib/** - Express.js route loader
- **/logger/** - Bunyan-based logger
- **/logs/** - Application log files
- **/modules/** - Server-side user modules
- **/public/css/** - CSS files
- **/public/img/** - Client-side image files
- **/public/js/app.js** - Client-side javascript bootstrapper
- **/public/js/controllers.js** - Angular controllers loader
- **/public/js/directives.js** - Angular directives loader
- **/public/js/filters.js** - Angular filters loader
- **/public/js/routes.js** - Angular routes
- **/public/js/services.js** - Angular services loader
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
module.exports = function(app) {
    // index
    app.get('/', function(req, res) {
        return res.render('index');
    });
};
```

This file would define the routes and the logic for the home page. The advantage of keeping routes and logic segregated in individual files starts to show as the application grows. If something fails, it's very easy to pinpoint where things went wrong.

When a new controller is created, the generator will also create both client and server-side templates, routes and all needed client javascript files for you.  
It is also possible to generate client-side only controllers. To do so, simply say "No" to question about server-side templates during controller generation.

### Models

Data models are separated from the controller logic resulting in cleaner, more organized code. Data models live in the `/models/` folder.

### Templates

[Dust JavaScript templates](https://github.com/linkedin/dustjs) are the default server-side templating language.
[Angular templates] are used in client-side.

Server-side templates are loaded from the `/views/` directory.  
Client-side templates are loaded from the `/public/templates/` directory.

### POST requests

Since Powder.js utilizes CSRF tokens for increased security, to send POST request that will be accepted you need to inclide this token.  
To do that you have to pass token from server into your template (or javascript request). The token can be retrieved from `csrf` variable.  
Request must contain the token in `_csrf` field.  
For example, you can include it in template like this: `<input type="hidden" name="_csrf" value="{csrf}" />`

### Async/await

Powder.js utilizes [Asyncawait](https://github.com/yortus/asyncawait) and promises (using [bluebird](https://github.com/petkaantonov/bluebird)) to simplify asynchronous code.  

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

You can quickly setup a [vagrant](http://www.vagrantup.com/) environment that includes all the required packages for puwder.js app to work.  
To do so, follow the steps below:  
1. Run `yo powder:vagrant` to generate all the required vagrant files
2. Run `vagrant up` to provision the box
3. Run `vagrant ssh` to open box shell
4. Use `cd /vagrant` to navigate to shared folder with app code
5. Run the app using `gulp` command

Please, note that you might need to remove `node_modules` folder and re-run `npm install` inside of a vagrant box to re-compile some of the node modules, otherwise you might get some warnings that are not critical (e.g. `Failed to load c++ bson extension, using pure JS version`).

### TODO

Add more docs, subgenerators and a proper test suite.

## License

[MIT](http://opensource.org/licenses/MIT)
