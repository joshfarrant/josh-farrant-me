---
title: How To Add Emoji Support To Any Website
slug: adding-emoji-support-to-any-website
date_published: 2015-04-08T20:20:07.000Z
date_updated:   2016-01-26T13:49:19.000Z
tags: General, Internet, Emoji
---

Browser support for Emoji rendering is still [quite poor](http://caniemoji.com/), so there's no guarantee that a user will be able to see the glorious Emojis you've spent so long selecting. 😰

Fortunately, with the recent release of Twitter's [Twemoji library](https://github.com/twitter/twemoji), you can add Emoji support directly to your website in a few lines of code, rather than having to rely on the browser to take care of it! 😄

The Twemoji library can detect Unicode Emoji characters within text and convert them into images of the respective Emoji. For example; you can give it an unrendered Unicode Emoji character, which will likely display as 􏿿 in many browsers, and it will return an `<img>` tag linking to an image of that Emoji, which you can then insert into the DOM to replace the blank 􏿿 character.

```js
twemoji.parse('􏿿');

// Returns
<img class="emoji" draggable="false" alt="☕" src="http://twemoji.maxcdn.com/16x16/2615.png">
```

This is great as it is, however Twemoji goes one step further. You can simply pass the `parse` method a reference to the `document.body`, and it will find and replace all Unicode Emoji characters in the `<body>` with the corresponding `<img>` tag! This allows you to add full Emoji support to your site in less than 10 lines of code.

### emoji.js

```js
window.onload = function() {
  // Set the size of the rendered Emojis
  // This can be set to 16x16, 36x36, or 72x72
  twemoji.size = '16x16';

  // Parse the document body and
  // insert <img> tags in place of Unicode Emojis
  twemoji.parse(document.body);
}
```

### emoji.css

```css
img.emoji {
  // Override any img styles to ensure Emojis are displayed inline
  margin: 0px !important;
  display: inline !important;
}
```

Don't forget to include the twemoji.min.js file, which is available on MaxCDN for convenience.

```html
<script src="//twemoji.maxcdn.com/twemoji.min.js"></script>
```

By including the above code you can insert Unicode Emoji characters into any text on your website safe in the knowledge that they will be visible to the user.

It's great that there's such a quick way to guarantee Emoji visibility, regardless of the platform used, the browser's built-in Emoji support, and without the need for browser extensions. You can finally show off your new [Emoji Domain](http://blog.farrant.me/getting-an-emoji-domain-in-2015/) in all it's glory!

[💻☕.ws](http://💻☕.ws)
