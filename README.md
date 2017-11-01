# ![Vitals](https://raw.githubusercontent.com/garrettw/vitals/master/vitals-logo-b.png)

[![GitHub tag](https://img.shields.io/github/tag/garrettw/vitals.svg?style=flat-square)](https://github.com/garrettw/vitals/tags) [![Github All Releases](https://img.shields.io/github/downloads/garrettw/vitals/total.svg?style=flat-square)](#)
[![npm version](https://img.shields.io/npm/v/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss) [![npm downloads](https://img.shields.io/npm/dt/vitals-scss.svg?style=flat-square)](https://yarnpkg.com/en/package/vitals-scss)

Vitals makes a great addition to your Sass toolkit. It happily exists alongside
the other libraries you already use and even expects you to use them.

Vitals simply consists of three Sass tools for building modern, flexible websites:
an improved normalize (also available in pure CSS), a flexbox-based grid layout
system, and a fluid sizing function.

Browser support:
- IE 11
- Edge
- Firefox 28+
- Chrome 44+
- Safari/iOS 10.1+
- Opera 31+
- Chrome for Android
- Firefox for Android

The goal is to be compatible with the most common browsers and versions currently
in use. For example, older versions of IE (like 6-8) are intentionally not
supported. Very few people use those versions, and if support for them is needed,
I'm not interested in tackling that as it involves a lot of extra work for not much benefit.

**I highly recommend combining Vitals with the excellent [MQ+](https://github.com/mcaskill/sass-mq)
media query library to create responsive grids and font sizes.**

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

Or you can import the other components individually, if you like:
```scss
@import "fluid";
@import "grid";
```

### How to use Vitals Grid

To start off, create a CSS class for a grid row container - something like this:
```scss
.page {
  @include vg-row;
}
```
If you want, you can then add any of the following to that class to tweak it:
```scss
  // reverses the flow of cells in the row (like LTR -> RTL)
  // NOTE: this also reverses the effects of vg-align-left and vg-align-right!
  @include vg-reverse;

  // sets the horizontal alignment of all cells within row
  @include vg-align-left;
  @include vg-align-center;
  @include vg-align-right;
  @include vg-align-justify;      // equal space between, none on l/r edge
  @include vg-align-equalmargins; // space on edge will be 1/2 of space between

  // sets the vertical alignment of all cells within row
  @include vg-valign-top;
  @include vg-valign-middle;
  @include vg-valign-bottom;
```

Now that you have a row container, here's the signature of the cell mixin.
```scss
  @mixin vg-cell($fraction[, $gutter: 0.625rem]);

  // ONLY for cells inside containers that use vg-reverse
  @mixin vg-cell-reverse($fraction[, $gutter: 0.625rem]);
```
The first parameter is a fraction that specifies the width of the cell, and the
second (optional) parameter sets a custom gutter size between the cells (default
is 0.625rem, or 10px).

So, let's make some cells to put in the row. I think I'll have a left and
a right sidebar (both the same size) with a content area in the middle, and I'll
just use the default gutter.
```scss
.sidebar {
  @include vg-cell(1/4);
}

.content {
  @include vg-cell(1/2);
}
```
I want all of my cells to match the height of the tallest one, so
I won't need any of the following. But if you don't want that behavior, you can
have them vertically aligned however you want, and you can change this behavior
at the cell or even container level (see above).
```scss
  // overrides the vertical alignment setting for this cell only
  @include vg-cell-valign-top;
  @include vg-cell-valign-middle;
  @include vg-cell-valign-bottom;
```

#### How to make cells responsive

To use Vitals Grid in a responsive manner, just redefine your `@vg-cell`s
with a different size inside of media queries.
This works because any cell that exceeds 100% of a row's width will be wrapped
automatically – creating a column without setting `flex-direction: column`
(which would come with its own set of caveats). And it's better than a flex
column because this way you can still have multiple cells on one row if you want.

Here's a primitive example using the sidebar class and media query library I
recommended above.
```scss
.sidebar {
  @include vg-cell(1); // full width by default, for mobile-first design

  @include mq(48em) {
    @include vg-cell(1/4); // 25% wide at desktop resolution
  }
}
```

It's that simple!

### How to use Vitals Fluid

Fluid is a function you can use that will output a flexible dimension that
scales along with the viewport width for use with any property (most
commonly `font-size`).

Here's the signature for the function.
```scss
@function v-fluid($sm, $lg, $narrow, $wide);
```
`$sm` is the size to be used when the viewport is at `$narrow` width, and `$lg`
is the size at `$wide` width.

This function outputs a `calc()` string that scales the size linearly from `$sm`
to `$lg` for the viewport range of `$narrow` to `$wide`.

**Be sure to use this INSIDE a media query, because unexpected behavior may
result if the viewport is not within the range of `$narrow` to `$wide`.**

Here's an example using Modular Scale and MQ+.
```scss
body {
  // the smallest font size, for mobile first
  font-size: ms(0);

  @include mq(45em, 60em) {
    // the intermediate size, which scales smoothly
    font-size: v-fluid(ms(0), ms(1), 45em, 60em);
  }

  @include mq(60em) {
    // the largest size
    font-size: ms(1);
  }
}
```

## About the grid layout system

At some point in my journey as a web dev, I came across Bootstrap like so many have.
Then at a later date, I decided to see what else was out there, and decided I
liked Foundation better. But as I started to look into using Sass, while Foundation
had a Sass version, I came to find that there were some grid systems that were
built primarily for Sass usage.

... like [Bourbon Neat](http://neat.bourbon.io/). I was about to adopt that as
my own when I realized that it was a float-based grid like the Bootstrap and
Foundation I had left behind. But I did appreciate its emphasis on semantics,
and I wanted to hang onto that as I looked for a flexbox-based system.

So I found a project called [Batch](http://martskin.github.io/batch/)
that implemented flexbox using Sass. It looked cool until I saw the unsemantic
class names that resembled Bootstrap.

I figured surely it wouldn't take much to adapt Batch into something that would
allow better semantics. So that's what I've done here.

Then Neat 2.0 came out and introduced me to the concept of a push-left grid being
better than the old half-gutter grid I had originally written for Vitals. Because
Neat is still sticking to a float-based grid, I adapted the push-left concept to
flexbox to make the current Vitals Grid system.

You'll notice that there's no compiled version of the grid system.
That's intentional; my entire purpose for making it was for it to be used with
Sass to generate grid code for semantic CSS selectors. That's just not possible
with pure CSS. So if you want a pure CSS flexbox grid system, check out [Batch](http://martskin.github.io/batch/).

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
