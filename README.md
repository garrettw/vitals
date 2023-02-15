# ![Vitals](https://raw.githubusercontent.com/garrettw/vitals/master/vitals-logo-b.png)

[![npm version](https://img.shields.io/npm/v/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm package size](https://img.shields.io/bundlephobia/min/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm total downloads](https://img.shields.io/npm/dt/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm weekly downloads](https://img.shields.io/npm/dw/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)
[![npm monthly downloads](https://img.shields.io/npm/dm/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss)

**[Download Vitals using Yarn!](https://yarnpkg.com/en/package/vitals-scss)**

Vitals makes a great addition to your Sass toolkit. It exists solely to fill gaps that other projects do not.

Vitals consists of a few simple Sass tools for building modern, flexible websites:
an improved normalize (also available in pure CSS), shorthand systems for flexbox and grid,
and a fluid sizing function.

Browser support:
- Edge
- Firefox 28+
- Chrome 44+
- Safari/iOS 10.1+
- Opera 31+
- Chrome for Android
- Firefox for Android

The goal is to be compatible with the most common browsers and versions currently
in use.

**I highly recommend combining Vitals with the excellent [MQ+](https://github.com/mcaskill/sass-mq)
media query library to create responsive grids and font sizes.** But Breakpoints is ok too.

## How to use Vitals in your Sass project

_**Disclaimer:** I come from the world of PHP and have no experience with Ruby or Node,
so I've never really used any of the usual tooling to install this kind of stuff.
So naturally, I'm writing these instructions for someone like myself._

If you grab everything in the `scss` directory and put it in the same directory
as the file you're working on, you can just use this, which will pull in all the
important stuff:
```scss
@import "vitals";
```

Or you can import the pure Sass components without the normalize, if you like:
```scss
@import "flex-grid";
@import "fluid";
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
- [Bourbon](http://bourbon.io/)
- [MQ+](https://github.com/mcaskill/sass-mq) (media queries)
- [Typey](https://github.com/jptaranto/typey) (for managing font schemes)
- [Modular Scale](https://github.com/modularscale/modularscale-sass)
- [Chroma](https://github.com/JohnAlbin/chroma) (for managing color schemes)
- [ColorMeSass](https://github.com/RichardBray/color-me-sass) (tons of color values)
- [Color Schemer](https://github.com/at-import/color-schemer) (manipulates colors)

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
