---
title: Writing Kick-Ass Sass With OOSass
slug: writing-kick-ass-sass-with-oosass
date_published: 2016-01-28T13:50:00.000Z
date_updated:   2016-01-28T17:15:27.000Z
tags: Sass, CSS, OOSass
---

![Sass Monster](/blog/images/oosass-sass-monster.png)

I write a lot of CSS. If you'd have come to me a few years ago and asked me how to write good CSS I wouldn't have been able to tell you - I'd have told you to come back in a couple of years and ask me again, I'd probably have an answer for you by then.

Well, up until recently, I still didn't have an answer. Now, however, I might be one step closer.

### The Problem

Writing clean, reusable, and maintainable CSS is difficult. New projects always begin with the best intentions; classes are reused, everything is clean, and everyone is happy. Over time, however, those classes get tweaked, instances of those classes require overrides, a few `#` selectors and `!important`s creep in and, before you know it, you've got another jumbled, unmaintainable mess that _just works_.

I don't think I'm alone in writing CSS like this; I might be, but I don't believe I am. Projects start well, however as time goes on it's far too easy to get lazy and add a quick fix.

I decided to tackle this problem head-on and set about to see how others were approaching it. After a bit of reading on the topic, I came across a few suggestions of CSS methodologies which claim to help you structure your code through the use of naming-conventions and standardised style structure. Disappointingly however, they all felt a bit lacking. The most common methodologies suggested were:

- [BEM](http://getbem.com/introduction/) - The most popular. Feels like a messy workaround for the lack of scope support in CSS.
- [SMACSS](https://smacss.com/) - Similar to BEM, more of a style guide than anything else.
- [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/) - The most appealing of the three, however HTML markup is bloated with multiple classes.

The overarching problem with all of these methodologies is that they were clearly designed to work well with pure CSS, but it's 2016 and [no-one writes pure CSS any more](https://twitter.com/FarPixel/status/692473007982379008). I wanted to find something that took advantage of some of the best features of my CSS preprocessor of choice - [Sass](http://sass-lang.com/).

### Enter OOSass

I've been a Sass user for some time, so when I stumbled upon [this article](http://thesassway.com/intermediate/using-object-oriented-css-with-sass) on the topic of OOSass (Object-Oriented Sass) I had high hopes that this would be the methodology for me.

After spending a bit of time reading through examples it was clear that OOSass offered exactly what I'd been looking for. The example from the article linked above illustrates the advantages this methodology quite well, so I'll repeat it here. We'll create two different buttons which share some common styles.

```html
<!-- index.html -->
<a href="#" class="btn--twitter">Twitter</a>
<a href="#" class="btn--facebook">Facebook</a>
```
```scss
/* style.scss */
%button {
  min-width: 100px;
  padding: 1em;
  border-radius: 1em;
}
%twitter-background {
  color: #fff;
  background: #55acee;
}
%facebook-background {
  color: #fff;
  background: #3b5998;
}

.btn {
  &--twitter {
    @extend %button;
    @extend %twitter-background;
  }
  &--facebook {
    @extend %button;
    @extend %facebook-background;
  }
}
```

OOSass takes advantage of Sass' placeholder selectors and the `@extend` directive to help you write clean, clear, reusable code with minimal effort and no overhead of learning naming conventions.

The example above is fairly self-explanatory (as our code should be!), so I won't go into too much detail. If you're not familiar with Sass, however, some of the syntax may not be clear. Placeholder selectors `%` are very similar to class and id selectors, however unlike class and id selectors they don't get rendered to your CSS. This means that they don't clutter up your outputted CSS with classes that are never actually used in your markup. The `@extend` directive is able to pull in these placeholder selectors and render them as properties in the declaration block.

The above Sass compiles down into the following readable and efficient CSS. Notice that there are no `.button`, `.facebook-background`, or `.twitter-background` classes in the compiled CSS.

```css
/* style.css */
.btn--twitter, .btn--facebook {
  min-width: 100px;
  padding: 1em;
  border-radius: 1em;
}

.btn--twitter {
  color: #fff;
  background: #55acee;
}

.btn--facebook {
  color: #fff;
  background: #3b5998;
}
```

The modular way in which properties are defined in the OOSass methodology is really appealing; it promotes the use of small blocks of CSS which can be easily reused throughout your code, with the added advantage of not bloating your markup or your stylesheet with a lot of classes. It's easily extensible, easy to learn, and very readable. In my opinion, the way OOSass approaches many of CSS' inherent problems outclasses BEM and all other CSS methodologies I've looked into.

I'd love to hear people's thoughts on this, so if you've got anything to add, or any questions, let me know in the comments below, or tweet me [@FarPixel](https://twitter.com/farpixel).