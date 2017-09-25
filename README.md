# ![Vitals](https://raw.githubusercontent.com/garrettw/vitals/master/vitals-logo-b.png)

[![GitHub tag](https://img.shields.io/github/tag/garrettw/vitals.svg?style=flat-square)](https://github.com/garrettw/vitals/tags) [![Github All Releases](https://img.shields.io/github/downloads/garrettw/vitals/total.svg?style=flat-square)](#)
[![npm version](https://img.shields.io/npm/v/vitals-scss.svg?style=flat-square)](https://www.npmjs.com/package/vitals-scss) [![npm downloads](https://img.shields.io/npm/dt/vitals-scss.svg?style=flat-square)](https://yarnpkg.com/en/package/vitals-scss)

Vitals is simply a bundle of two Sass tools for building modern, flexible websites: a normalize/reset and a
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
as the main file you're working on, you can use:
```scss
@import "vitals";
```
That's all you need in order to use the main part of Vitals.
However, it also includes a few constants you can use in your own code:
- `$stdvgap` is set to 1.125rem (18px in a typical browser). This controls the vertical rhythm.
- `$stdhgap` is set to 1.25rem (20px in a typical browser). This is currently used only with blockquote and legend elements to calculate reasonable horizontal margins.

### How to use Vitals Grid

Vitals Grid allows you to set your own defaults for the mixins below to use.

**Before** importing Vitals into your SCSS code, you may set your own default value
for the following variable if you like.
- `$vg-gutter` - default is 0.625rem (10px in a typical browser). Used by `@vg-cell`.

Now you're ready to create a grid container. Make a new class for your container and start it with this:
```scss
    @include vitals-grid;
```
From there, you can use the following mixins to tweak it:
```scss
    // reverses the flow of cells in the grid (like LTR -> RTL)
    // NOTE: this also reverses the effects of vg-align-left and vg-align-right!
    @include vg-reverse;

    // sets the horizontal alignment of all cells within container
    @include vg-align-left;
    @include vg-align-center;
    @include vg-align-right;
    @include vg-align-justify;      // equal space between, none on l/r edge
    @include vg-align-equalmargins; // space on edge will be 1/2 of space between
    @include vg-align-distribute;   // same spacing on edge and between

    // sets the vertical alignment of all cells within container
    @include vg-valign-top;
    @include vg-valign-middle;
    @include vg-valign-bottom;
```

Now that you have a container, let's make some cells to put in it.
Put ONE of these in your cell classes:
```scss
    // creates a cell 1/3 of the container's width including a gutter of the default size
    @include vg-cell(1/3);

    // creates a cell 2/3 of the container's width including a custom gutter size of 1rem
    @include vg-cell(2/3, 1rem);

    // creates a cell 1/4 of the container's width including no gutter
    @include vg-cell(1/4, 0);
```
Then, you can further tweak your cells using the following:
```scss
    // overrides the vertical alignment setting for this cell only
    @include vg-cell-valign-top;
    @include vg-cell-valign-middle;
    @include vg-cell-valign-bottom;
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
- [Bourbon/Bitters/Refills](http://bourbon.io/)
- [Breakpoint](http://breakpoint-sass.com/)
- [Typey](https://github.com/jptaranto/typey)
- [Chroma](https://github.com/JohnAlbin/chroma)
- [ColorMeSass](https://github.com/RichardBray/color-me-sass)
- [Color Schemer](https://github.com/at-import/color-schemer)

I'll add to this list as I find other useful Sass projects.
