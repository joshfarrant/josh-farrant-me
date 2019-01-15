---
title: Creating iOS 12 Shortcuts with JavaScript and Shortcuts JS 🧞‍
slug: creating-ios-12-shortcuts-with-shortcuts-js
author: Josh Farrant
date_published: 2018-11-16T12:00:00.000Z
tags: Shortcuts JS
---

### TL;DR

I created a library that allows you to create Shortcuts using JavaScript. You can find it on npm as [@joshfarrant/shortcuts-js](https://www.npmjs.com/package/@joshfarrant/shortcuts-js), and find the documentation on [GitHub](https://github.com/joshfarrant/shortcuts-js).

_Note: Some images in this post refer to the library as just shortcuts-js, however the library can actually be found at [**_@joshfarrant/shortcuts-js_**](https://www.npmjs.com/package/@joshfarrant/shortcuts-js)._

![A simple Shortcut, built with Shortcuts JS](/blog/images/shortcuts-js-1.png)

### Why Build This?

Since the release of Shortcuts along with iOS 12 earlier this year, I’ve been spending a lot of time playing around with the Shortcuts app. I’ve enjoyed creating Shortcuts to do things like control devices around the home, log my sleep to the Health app, and automatically log my commute cycle and set my Slack status when I arrive at work. The Shortcuts app makes it easy to jump straight in and start start building powerful workflows to help automate the things you do the most, but it’s not perfect.

After a few weeks of using the Shortcuts app, I started to see where the Shortcut building interface falls down. Large Shortcuts become cumbersome to modify or refactor, especially on iPhone, as dragging a dozen-or-so actions from one point to another is time consuming and error-prone. Also, there’s no easy way to duplicate a block of actions, or modify them in bulk. Finally, and this might just be because I’m on the beta, it can be a bit buggy.

As a developer, this began to frustrate me. Actions in the Shortcuts app equated to lines of code in my mind, and so I longed for the ability to group commonly-used blocks of actions together into larger functions, and reuse them elsewhere with slightly different parameters. These frustrations got me thinking; the Shortcuts app is just an interface designed to simplify the process of writing code, so why can’t I just cut out the middleman and write the code myself? I started thinking about digging around in the Shortcuts app to try to figure out how Shortcuts are structured, and how I could begin to go about generating them outside of the Shortcuts app.

> Why can’t I just cut out the middleman and write the code myself?

### Reverse Engineering a Shortcut

The first place I thought to look was the iCloud Shortcut sharing service. I was hoping that the URL that’s used to share a Shortcut might actually contain some encoded data that the app would then decode as it imports. Unfortunately, it quickly became apparent the string in the URL was just an identifier and didn’t relate to the contents of the Shortcut in any way, so I needed to look elsewhere.

A few days passed and, as I was scrolling through my list of Shortcuts, I noticed one which I’d downloaded a few weeks earlier. This Shortcut allowed you to back up your Shortcuts to iCloud, which could be useful if the app’s database ever became corrupted. You’d back up your Shortcuts and, if the worst happened, you could then just import those files back into the Shortcuts app and everything would be back to normal. Surely then, these files must contain all of the information required to build a Shortcut. I ran the backup, opened up one of the Shortcuts in a text editor, and this is what I was greeted with.

![A .shortcut file, opened in VSCode](/blog/images/shortcuts-js-2.png)

Not exactly readable, but I was getting closer!

For starters, we can see that there are lots of references to properties beginning WF, which are obviously unchanged since the app’s days as Workflow. Also, we can see from the first line that this is actually a bplist file, a binary property list that’s quite common in the Apple ecosystem. I changed the file extension from .shortcut to .bplist and tried again to open the file, this time in XCode.

![A .bplist file, opened in XCode](/blog/images/shortcuts-js-3.png)

🎉 🎉 🎉

Here it is, all of the information that makes up a Shortcut! We can see the properties that are used to set the icon, the inputs the Shortcut accepts, and (most importantly) the Shortcut’s actions. To make things more readable, I converted the bplist to JSON using [bplist-parser](https://www.npmjs.com/package/bplist-parser).

![A Shortcut’s WFWorkflowActions array, formatted as JSON](/blog/images/shortcuts-js-4.png)

Here we’ve got a pretty straightforward and readable array of actions. Each action has a string identifier, _WFWorkflowActionIdentifier_, and an object/dictionary of parameters, _WFWorkflowActionParameters_. These properties are common across all Shortcut actions I’ve seen so far, and are the only properties required to define an action.

From here, it was just a matter of exploring what the properties of other actions looked like, and how more complex interactions are handled, such as using variables in actions, and nesting actions inside blocks such as _If_ and _Repeat._

### Shortcuts JS

Now that I had a basic template for a Shortcut, I could start writing some code to generate these templates for me. I started simple and wrote a quick Node script to generate a Shortcut which adds two numbers together. After a bit of work, this is what the complete generated Shortcut looked like.

![A shortcut to calculate 1 + 2, formatted as JSON](/blog/images/shortcuts-js-5.png)

After converting this JSON to a bplist, I Airdropped it over to my iPhone and was thrilled to see that it worked!

![The generated Shortcut, successfully imported into the Shortcuts app](/blog/images/shortcuts-js-6.png)

Now that I had a proof-of-concept, I could get to work building the library. I decided to go with TypeScript as the additional type-safety it provides makes perfect sense for a very structured library like this.

As I was building Shortcuts JS, I had two main priorities in the forefront of my mind.

*   It should expose a very simple API.
*   It should be easy, if not trivial, to add additional actions.

I felt that the latter point was paramount. Realistically, I’m not going to be able to add **all** possible actions myself, I’ll need the community’s help to even get as far as having all native actions available, let alone having all actions available from the hundreds (thousands?) of 3rd party apps out there with Shortcuts support. Because of this, I need to make adding a new action as easy as possible. For the same reasons, I also wanted the library to be fully tested, as it will quickly become impossible to test actions manually.

After many hours of developing, testing, and restructuring, I’ve finally settled on an API and structure that I’m happy with. A basic example looks like this.

![A simple Shortcuts JS example](/blog/images/shortcuts-js-0.png)

I could delve into detail here about what’s going on in the example above, but I’m hoping that it’s actually pretty self-explanatory. Take a look at the project on [GitHub](https://github.com/joshfarrant/shortcuts-js) for a more in-depth breakdown of the API.

### What Now?

Thanks for making it this far! Now that Shortcuts JS is out I think the first goal should be to try to make all native Shortcut actions available in Shortcuts JS. Along with that, it would be fantastic to have as many 3rd party app actions available as possible. That’s quite a bit to be getting on with, so if you’ve got the time to help with anything at all, from writing code to creating issues to document what’s missing, then I’d love to have you as a contributor!

I’d love for you to try out Shortcuts JS. If you want to give it a go, you can find it on npm as [@joshfarrant/shortcuts-js](https://npmjs.com/package/@joshfarrant/shortcuts-js), and find the documentation on [GitHub](https://github.com/joshfarrant/shortcuts-js). It’s somewhat barebones at the time of writing, so if it’s missing an action you need then either [open an issue](https://github.com/joshfarrant/shortcuts-js/issues/new) or (even better) have a go at adding it yourself and then create a pull request. As I mentioned earlier, I tried to make it as easy as possible to add a new action, so check out the [CONTRIBUTING](https://github.com/joshfarrant/shortcuts-js/blob/master/CONTRIBUTING.md) guide for more information on that. For anything else, [open an issue](https://github.com/joshfarrant/shortcuts-js/issues/new) or [Tweet me](https://twitter.com/farpixel)!

Thanks for reading! 💙 🧞‍