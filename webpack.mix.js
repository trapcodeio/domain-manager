const mix = require('laravel-mix');
mix.setPublicPath('public');

mix.js('frontend/vues/app.js', 'js');
mix.js('frontend/vues/bundle.js', 'js');

mix.sass('frontend/scss/app.scss', 'css');
mix.sass('frontend/scss/bundle.scss', 'css');

mix.version();