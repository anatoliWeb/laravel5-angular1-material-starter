const elixir = require('laravel-elixir');
require('laravel-elixir-ngtemplatecache');
require('laravel-elixir-ng-annotate');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss');
    mix.sass('dashboard.scss');
    mix.webpack('app.js');
    mix.webpack('dashboard.js');
    mix.version(['css/*.css', 'js/*.js']);
});

// elixir(mix => {
//     mix.ngTemplateCache('/**/*.html', 'public/js', './resources/assets/templates/**', {
//         templateCache: {
//             standalone: true
//         },
//         htmlmin: {
//             collapseWhitespace: true,
//             removeComments: true
//         }
//     });
// });

elixir(mix => {
    mix.ngTemplateCache('/**/*.html', 'public/js', './resources/assets/templates/**', {
        templateCache: {
            standalone: true,
            module: 'appTemplates',
            filename: 'app.templates.js'
        },
        htmlmin: {
            collapseWhitespace: true,
            removeComments: true
        }
    });
});