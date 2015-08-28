# grunt-simple-underscore-compiler

> simple Compile underscore templates into JavaScript files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install simple-underscore-compiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('simple-underscore-compiler');
```

## The "grunt-simple-underscore-compiler" task

### Overview
In your project's Gruntfile, add a section named `grunt-simple-underscore-compiler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  underscore_compiler: {
            custom_target: {
                files: {
                    'dist/test.js': 'test/test.tpl',
                    'dist/test2.js': 'test/test.html'
                }
            }
        }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
