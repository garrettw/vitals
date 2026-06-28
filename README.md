# ![Vitals](https://raw.githubusercontent.com/garrettw/vitals/master/vitals-logo-b.png)

[![npm version](https://img.shields.io/npm/v/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm package size](https://img.shields.io/bundlephobia/min/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm total downloads](https://img.shields.io/npm/dt/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm weekly downloads](https://img.shields.io/npm/dw/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm monthly downloads](https://img.shields.io/npm/dm/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)

## Overview

Vitals makes a great addition to your Sass toolkit. It exists solely to fill gaps that other projects do not.

It consists of a few simple Sass tools for building modern, flexible websites:
an improved normalize (including a pure CSS version), shorthand systems for flexbox and grid,
and a fluid sizing function.

Browser support:
- Edge 88+
- Firefox 78+
- Chrome 88+
- Safari/iOS 14+
- Opera 74+
- Chrome for Android
- Firefox for Android

The goal is to be compatible with the most common browsers and versions currently
in use.

**I highly recommend combining Vitals with the excellent [MQ](https://github.com/sass-mq/sass-mq)
media query library to create responsive grids and font sizes.** But [Breakpoint](https://github.com/at-import/breakpoint) is ok too.

## Installation / Usage

Install from npm:

```bash
npm install vitals-scss
```

Or with Yarn:

```bash
yarn add vitals-scss
```

If you install Vitals from npm or Yarn, use the package directly from `node_modules` with Sass module syntax:
```scss
@use "vitals-scss";
```

This works in modern JS build workflows such as Vite, Webpack/Sass loader, Next.js, Astro, Eleventy, and any Dart Sass-based pipeline that resolves `node_modules`.

If you want only the core Sass utilities without the normalize layer:
```scss
@use "vitals-scss/scss/flex-grid";
@use "vitals-scss/scss/fluid";
```

If you instead copy the `scss` directory into your project and use it locally, import it from the local path:
```scss
@use "vitals";
```

Or you can load just the core Sass components without the normalize layer:
```scss
@use "flex-grid";
@use "fluid";
```

### Vitals Flex+Grid

Flex+Grid is little more than some rewritten vocabulary that makes more sense to me.
It's just a little syntactic sugar for those who already use flexbox and grid capably.

#### API Overview

Flex container mixins:
```scss
// This is the most basic one that the others inherit from.
// Its only advantage over "display: flex;" is that it adds "align-items: stretch"
// for browser normalization.
@include flex;

// Each of these also work stand-alone.
@include flex-row;
@include flex-row-reverse;
@include flex-col;
@include flex-col-reverse;
```

Flex item mixin:
```scss
// This is just a shortcut for flex: 0 1 auto; for browser normalization purposes.
@include flex-item;
```

Flex alignment modifiers:
```scss
// On a flex row, this aligns horizontally.
// Accepts all valid CSS values for justify-content, as well as
// "start", "end", and "justify" if you like those better.
@include flex-align($val);

// On a flex row, this aligns vertically. I call them "xalign" because "x" indicates
// alignment on the cross axis, thus making these suitably named for columns as well.
// Accepts all valid CSS values for align-items, as well as "start" and "end".
@include flex-xalign($val);

// On a flex row child, this changes vertical alignment per item.
// Accepts all valid CSS values for align-self, as well as "start" and "end".
@include item-xalign($val);
```

Flex item sizing function:
```scss
// Returns a measurement that accounts for gutter width.
// $fraction is literally a fraction size, like 1/4, that the item should occupy
// in the desired dimension.
// Default $gutter value is $item-gutter, which defaults to 0.625rem (10px).
item-size($fraction, $gutter)
```

Grid mixins:
```scss
@mixin grid-rows($val) { grid-template-rows: $val;    }
@mixin grid-cols($val) { grid-template-columns: $val; }

@mixin grid-align($val)  { justify-self: $val; }
@mixin grid-xalign($val) { align-self: $val;   }
```

#### Flex row Example
To start off, set up a container:
```scss
.row {
  @include flex-row;
}
```

Now that you have a row container, let's make some flex items that are 25% wide
with the default 10px gutter.
```scss
.this-item-here {
  @include flex-item;
  width: item-size(1/4);
  margin: 0 0 $item-gutter $item-gutter;
}
```
What happened here?
The `item-size()` function spits out a measurement that accounts for gutter width.
For a standard push-left grid a la [Bourbon Neat 2.0](http://neat.bourbon.io/), you'll
at least want to set `margin-left` to the gutter size. I also set `margin-bottom`
so that vertical spacing is the same. `$item-gutter` is an included variable that
is used by `item-size()` as the default gutter size if one isn't specified. It is
set to `0.625rem`, which is usually `10px`.

If you don't want a gutter, that's fine too.
```scss
.this-other-item {
  @include flex-item;
  width: item-size(1/3, 0); // equivalent to "width: percentage(1/3);"
}
```

#### How to make cells responsive

To use Vitals Grid in a responsive manner, just redefine your `item-size()`s
in different media queries. This works because any item that exceeds 100% of a
container's main axis will be wrapped automatically.

Here's a primitive example using a sidebar class and the MQ+ media query library
I recommended above.
```scss
.sidebar {
  @include flex-item;
  width: item-size(1); // full width by default, for mobile-first design
  margin-left: $item-gutter;

  @include mq(48em) {
    width: item-size(1/4); // 25% wide at desktop resolution
  }
}
```

It's that simple!

### Vitals Fluid

Fluid is a function that will output a flexible dimension, which scales along
with the viewport width, for use with any property.

**If you use this OUTSIDE of a media query, the scaling will not stop at a
minimum or maximum.**

This function takes a min and max size, and a min and max viewport.
```scss
fluid($sm, $lg, $narrow, $wide)
```
`$sm` is the size to be used when the viewport is at `$narrow` width, and `$lg`
is the size at `$wide` width.

This function outputs a `calc()` string that scales the size linearly from `$sm`
to `$lg` for the viewport range of `$narrow` to `$wide`.

Here's an example using Modular Scale and MQ+.
```scss
body {
  // the smallest font size, for mobile first
  font-size: ms(0);

  @include mq(45em, 60em) {
    // the intermediate size, which scales smoothly
    font-size: fluid($sm: ms(0), $lg: ms(1), $narrow: 45em, $wide: 60em);
  }

  @include mq(60em) {
    // the largest size
    font-size: ms(1);
  }
}
```

## Is that it?

Yes, for now. I think there are some existing projects that adequately address
their goals, such as:
- ~~[Bourbon](http://bourbon.io/)~~ (See [updated guidance](https://thoughtbot.com/blog/you-might-not-need-bourbon))
- ~~[Typey](https://github.com/jptaranto/typey) (for managing font schemes)~~ (unmaintained)
- ~~[Modular Scale](https://github.com/modularscale/modularscale-sass)~~ (unmaintained)
- ~~[Chroma](https://github.com/JohnAlbin/chroma) (for managing color schemes)~~ (unmaintained)
- ~~[ColorMeSass](https://github.com/RichardBray/color-me-sass) (tons of color values)~~ (unmaintained)
- ~~[Color Schemer](https://github.com/at-import/color-schemer) (manipulates colors)~~ (unmaintained)

I'll add to this list as I find other useful Sass projects.

## Tips
### Modular Scale
If you use the Modular Scale library, I've found that the following configuration
gives some nice round increments at multiples of 3.
```scss
$modularscale: (
  base: 1rem,
  ratio: 1.25992
);
```
Using this, `ms(0)` = 1rem, `ms(3)` = 2rem, `ms(6)` = 4rem, `ms(9)` = 8rem, and so on.

I've included this in `_defaults.scss` which you **must** import explicitly if
you want to use it, as it is optional.


## Development notes

To build the local source:

```bash
npm install
npm run build
```

For development watching source changes:

```bash
npm run watch
```

This project currently uses the Sass CLI to compile source files and PostCSS + Autoprefixer to apply browser-specific prefixes.

- `npm run watch` now runs both Sass watch and Autoprefixer watch together.
- `npm run compile` compiles `scss/_vitals.scss` into `css/vitals.css` and then applies Autoprefixer.
- `npm run minify` compiles `scss/_vitals.scss` into `css/vitals.min.css` and then applies Autoprefixer.
- `browserslist` in `package.json` determines the final vendor prefixes added to built CSS.

The build produces `css/vitals.css` and `css/vitals.min.css` from `scss/_vitals.scss`.
