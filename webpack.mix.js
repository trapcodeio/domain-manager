const mix = require('laravel-mix');
mix.setPublicPath('public');

mix.js('frontend/js/app.js', 'js');
mix.js('frontend/js/bundle.js', 'js');

mix.sass('frontend/scss/app.scss', 'css');
mix.sass('frontend/scss/bundle.scss', 'css');

mix.version();