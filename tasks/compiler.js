/*
 * simple-underscore-compiler

 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('grunt-simple-underscore-compiler', 'Compile underscore templates into JavaScript files.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            separator: grunt.util.linefeed + grunt.util.linefeed,
            indent: '    ',
            quoteChar: '\'',
            raw: true
        });

        var filesCount = 0;

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            var result = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                var source = grunt.file.read(filepath);
                var reg = /<import src="\S*"><\/import>/g;
                var match = source.match(reg);
                _.each(match, function(m) {
                    //console.log(m);
                    var reg1 = /src="\S*"/;
                    var src = m.match(reg1)[0].split('src=')[1].replace(/"/g, '');
                    // console.log(src);
                    var dist = grunt.file.read(src);
                    //  console.log(dist);
                    source = source.replace(m, dist);
                });
                // console.log(source);
                var result;

                result = html2string(source, quoteChar, options.raw, options.amd || hasNamespace ? options.indent + options.indent : '');
                result = quoteChar + result + quoteChar + ';';

                return result;

            }).join(grunt.util.normalizelf(options.separator));


            var tmpString;

            tmpString = 'define( ';

            tmpString += 'function(){\n return';
            result = tmpString + result;

            result += grunt.util.linefeed;
            result += '});';


            filesCount++;
            // Write the destination file.
            grunt.file.write(f.dest, result);
            grunt.verbose.writeln('File ' + f.dest + ' created.');
        });
        // Print a success message.
        grunt.log.ok(filesCount + ' ' + grunt.util.pluralize(filesCount, 'file/files') + ' created.');
    });

    // Helpers
    // -------
    function html2string(html, quoteChar, raw, indent) {
        var line;
        var rBase = new RegExp('\\\\', 'g');
        var rQuote = new RegExp('\\' + quoteChar, 'g');

        if (raw) {
            // Keep line break
            line = '\\n' + quoteChar + ' +' + grunt.util.linefeed + indent + quoteChar;
        } else {
            line = '\\n';
        }

        return html
            .replace(rBase, '\\\\')
            .replace(rQuote, '\\' + quoteChar)
            .replace(/\r?\n/g, line);
    }
};
