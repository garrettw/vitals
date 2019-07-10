const Fiber = require('fibers');

let mix = require('laravel-mix');

mix.sourceMaps(false, 'source-map');

// Compile
if (mix.inProduction()) {
  mix.sass('scss/_vitals.scss', 'css/vitals.min.css', { fiber: Fiber });
} else {
  mix.sass('scss/_vitals.scss', 'css/vitals.css', { fiber: Fiber });
}
