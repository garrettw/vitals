# ![Vitals](https://raw.githubusercontent.com/garrettw/vitals/master/vitals-logo-b.png)

[![GitHub tag](https://img.shields.io/github/tag/garrettw/vitals.svg?style=flat-square)](https://github.com/garrettw/vitals/tags) [![Github All Releases](https://img.shields.io/github/downloads/garrettw/vitals/total.svg?style=flat-square)](#)
[![npm version](https://img.shields.io/npm/v/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss) [![npm downloads](https://img.shields.io/npm/dt/vitals-scss.svg?style=flat-square)](https://yarnpkg.com/en/package/vitals-scss)

Vitals simply consists of two Sass tools for building modern, flexible websites: a normalize/reset and a
flexbox-based grid layout system.

Browser support:
- IE 11
- Edge
- Firefox 28+
- Chrome 44+
- Safari/iOS 10.1+
- Opera 31+
- Chrome for Android
- Firefox for Android

The normalize/reset is my own (smaller) spin on Normalize.css, and it is also
available in pure CSS.

The goal is to be compatible with the most common browsers and versions currently
in use. For example, older versions of IE (like 6-8) are intentionally not
supported. Very few people use those versions, and if support for them is needed,
I'm not interested in tackling that as it involves a lot of extra work for not much benefit.

**I highly recommend combining Vitals Grid with the excellent [Breakpoint](https://github.com/at-import/breakpoint)
library to create responsive grids.**

## How to use Vitals in your Sass project

If you grab both `_vitals.scss` and `_grid.scss` and put them in the same directory
as the main file you're working on, you can just use this, which will pull in everything:
```scss
@import "vitals";
```

Or, if you only want to use the grid system and not the normalize, you can use
`_grid.scss` by itself.
```scss
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

Here's a primitive example using the sidebar class from above.
```scss
.sidebar {
  @include vg-cell(1); // full width by default, for mobile-first design

  @media screen and (min-width: 48em) {
    @include vg-cell(1/4); // 25% wide at desktop resolution
  }
}
```

It's that simple!

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
- [Bourbon/Bitters/Refills](http://bourbon.io/)
- [Breakpoint](http://breakpoint-sass.com/)
- [Typey](https://github.com/jptaranto/typey) (for managing font schemes)
- [Typi](https://github.com/zellwk/typi) (handles typesetting with breakpoints)
- [RFS](https://github.com/MartijnCuppens/rfs) (fluid - Responsive Font Size)
- [Modular Scale](https://github.com/modularscale/modularscale-sass)
- [Chroma](https://github.com/JohnAlbin/chroma) (for managing color schemes)
- [ColorMeSass](https://github.com/RichardBray/color-me-sass) (tons of color values)
- [Color Schemer](https://github.com/at-import/color-schemer) (manipulates colors)

I'll add to this list as I find other useful Sass projects.

### A word about Modular Scale
If you use the Modular Scale library, I've found that the following configuration
gives some nice round increments at multiples of 3.
```scss
$modularscale: (
  base: 1em,
  ratio: 1.25992
);
```
Using this, `ms(0)` = 1em, `ms(3)` = 2em, `ms(6)` = 4em, `ms(9)` = 8em, and so on.

I didn't include this in Vitals (even though I could) because I think doing so
would be a bit too heavy-handed.
