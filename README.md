# ![Vitals](https://raw.githubusercontent.com/garrettw/vitals/master/vitals-logo-b.png)

A few Sass tools for building modern, flexible websites.

The goal is to be compatible with the most common browsers and versions currently
in use. For example, older versions of IE (like 6-8) are intentionally not
supported. Very few people use those versions, and if support for them is needed,
I'm not interested in tackling that as it involves a lot of extra work for not much benefit.

## How to use it in your Sass project

If you grab both `_vitals.scss` and `_grid.scss` and put them in the same directory
as the main file you're working on, you can use:
```scss
@import "vitals";
```
That's all you need in order to use the main part of Vitals.

### How to use the grid

Any class you write for elements that are to be grid containers must begin with:
```scss
    @extend %vitals-grid;
```
From there, you can use one or more of the following mixins to tweak it:
```scss
    @include vg-gutter; // applies the default horizontal gutter to the container
    @include vg-gutter(value); // applies a custom horizontal gutter value

    @include vg-reverse; // reverses the flow of cells in the grid (like LTR -> RTL)

    @include vg-align-left;   // aligns cells to the left of the container
    @include vg-align-center; // aligns cells to the horizontal center of the container
    @include vg-align-right;  // aligns cells to the right of the container

    @include vg-valign-top;    // aligns cells to the top of the container
    @include vg-valign-middle; // aligns cells to the vertical middle of the container
    @include vg-valign-bottom; // aligns cells to the bottom of the container
```

Now that you have a container, let's make some cells to put in it.
Put ONE of these in your cell classes:
```scss
    // creates a cell 1/3 of the container's width
    @include vg-cell(1, 3);

    // creates a cell 2/3 of the container's width including a gutter of the default size
    @include vg-cell-with-gutter(2, 3);

    // creates a cell 1/4 of the container's width including a custom gutter size of 1rem
    @include vg-cell-with-gutter(1, 4, 1rem)
```
Then, you can further tweak your cells using the following:
```scss
    @include vg-cell-border; // adds border on all sides of default color and width
    @include vg-cell-border(size); // custom size, default color
    @include vg-cell-border(size, color); // custom size and color

    // overrides the container's vertical alignment setting for this cell only
    @include vg-cell-valign-top;
    @include vg-cell-valign-middle;
    @include vg-cell-valign-bottom;
```

## About the parts of Vitals

### The CSS reset

Under `scss` you'll find `_vitals.scss` which is the main thing you'll want to
`@import` into your Sass project. It's my own (smaller) spin on Normalize.css.

Under `css` I've included the compiled forms of the SCSS for those who don't
want to use Sass. The `*.min.css` versions are best to use in production, of
course.

### The grid layout system

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
