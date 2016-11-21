# !(Vitals)[https://github.com/garrettw/vitals/raw/master/vitals-logo-b.png]

A few tools for building modern, flexible websites.

# The CSS reset

Under `scss` you'll find `_vitals.scss` which is the main thing you'll want to
`@import` into your Sass project. It's my own spin on Normalize.css.

You'll notice that not only is it shorter than Normalize.css, there are two
other files in that folder that aren't `@import`ed anywhere: `_ie9down.scss`
and `_ie10down.scss`. These two are to be `@import`ed as needed - if you need to
support those browser versions. If not, then you'll avoid unnecessary CSS by
only using the main file.

Under `css` and `min-css` I've included the compiled form of the SCSS for those
who don't want to use Sass. The `min-css` versions are best to use in
production, of course. You'll also see that the legacy IE styles are included
there, still as separate files. If you want to serve these files separately to
your end users, feel free, although I'd recommend adding whatever parts you need
into `vitals.css` before serving it to your end users.

# The grid layout system

At some point in my journey as a web dev, I came across Bootstrap like so many have.
Then at a later date, I decided to see what else was out there, and decided I
liked Foundation better. But as I started to look into using Sass, while Foundation
had a Sass version, I came to find that there were some grid systems that were
built primarily for Sass usage.

... like Bourbon Neat. I was about to adopt it as my own when I realized that
it was a float-based grid like the Bootstrap and Foundation I had left behind.
But I did appreciate its emphasis on semantics, and I wanted to hang onto that
as I looked for a flexbox-based system.

So I found a project called Batch that implemented flexbox while using Bourbon
as a dependency. It looked cool until I saw the unsemantic class names that
resembled Bootstrap.

I figured surely it wouldn't take much to adapt Batch into something that would
allow better semantics. So that's what I'm doing here. However, I wouldn't mind
getting rid of the Bourbon dependency, so we'll see how that goes.
