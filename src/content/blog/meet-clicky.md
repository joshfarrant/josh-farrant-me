---
title: \#Clicky - Slack's New Best Friend
slug: meet-clicky
author: Josh Farrant
date_published: 2015-01-21T21:21:50.000Z
date_updated:   2015-01-26T17:32:57.000Z
tags: Project, JavaScript, Chrome Extension, \#Clicky
---

![Clicky](/blog/images/meet-clicky-header.png)

*\#Clicky is a Chrome Extension designed to be the fastest way to share your current page to any of your Slack channels, users, or groups.*

**\#Clicky is available for download in the [Chrome Store](https://chrome.google.com/webstore/detail/clicky-for-slack/bllgmdlgbbmijcoecbnmgeoekhebgmac).**


I came up with the idea for #Clicky after our team at [Sipcentric](http://www.sipcentric.com) switched our internal communications over from using HipChat to Slack, as [many others have done recently](http://www.theverge.com/2014/10/31/7135639/slack-is-now-the-fastest-growing-workplace-software-ever). As we began using and, subsequently, relying on Slack more and more, we found we were sending dozens of links to one another throughout the day. At this point I began to realise that the simple process of sending a link to colleagues was in fact quite longwinded, and was comprised of at least 7 distinct steps.

- Select link in address bar
- Copy link to clipboard
- Open Slack (assuming Slack is already open in a tab, and that you're already signed in)
- Select channel/user/group to share to
- Paste link
- Send link
- Open your previous tab to get back to what you were doing

These 7 steps may not seem like much, but when repeated dozens of times in a day, across a whole team, the inefficiency of the process became apparent.

This wasn't good enough. I decided we shouldn't have to settle and began thinking of ways to speed this process up and to remove some of the obstacles to make sharing a link the simple and fundamental task that it should be.


### \#Clicky is born

I quickly settled on the idea that a Chrome Extension would be the best way to approach this problem. Google Chrome is the browser-of-choice within our team, and is currently the most popular desktop browser by market share, so it would be safe to assume that the majority of Slack users will be Chrome users too. Chrome also works very well across all major operating systems and has an established and trusted store that can host my extension, and deploy it to users with a simple one-click install process.

With the platform decided, the basic functionality I wanted to achieve was as follows:

- **User clicks extension icon to open it**
	- *User is presented with a list of available rooms to share to*
- **User clicks room to share their current page to**
	- *The URL of the user's currently active tab is retrieved, then posted to the appropriate room*

*NB: I will class channels, users, and groups as **rooms** for the sake of simplicity*

By implementing this functionality, the extension would reduce the process of sharing a link to just 2 steps; 5 fewer than is possible with Slack's default functionality.

With the basic functionality in mind I could finally start writing some code! But to write code, my project needs a name, right? The natural choice for me was **Clicky**, as I often find myself referring to links in this way, a throwback from many years of browsing forums.

> That sounds cool, send me a clicky! - *Josh Farrant*

As the extension's purpose would be to send links to Slack, it seemed fitting to append ~~a pound sign~~ / ~~a hashtag~~ / ~~an octothorpe~~ / a **#** to the beginning of the name, as a nod towards the Slack brand.

![Slack logo](/blog/images/meet-clicky-slack.png)

### Building #Clicky

Building a working prototype of #Clicky was surprisingly easy; the basic functionality of the Chrome extension was implemented within an hour and it was a straightforward process to build the extension out from there. To build #Clicky I would obviously have to rely on Slack's API quite heavily and, while the documentation is pretty good, the API itself is far from perfect, often being somewhat couterintuitive and quite limited.

Take HTTP status codes, for example. The API will often return a *200 OK* even when the request was not successful, leading to less than ideal error handling. Also, Slack currently don't have a method availaible for sending a link from one user to another using their API, which meant that #Clickys sent to colleague can only be displayed within that user's *slackbot* channel, not in their DM channel with the sender. Because of this, I opted to append the sender's username to received #Clickys to make searching through past messages easier.

![Clicky within Slack](/blog/images/meet-clicky-header.png)


### This is #Clicky

After a few different design iterations, this is #Clicky as it is now. I took a few design cues from Slack's UI, such as the choice of font (Lato), relative font weights, as well as the pill-like style used for the room names and the search-bar style.

![Clicky interface](/blog/images/meet-clicky-ui.png)

All of the code for #Clicky is available on GitHub, so feel free to have a look and play around with it, or you can download #Clicky straight from the Chrome Store!

- [#Clicky on GitHub](https://github.com/joshfarrant/slack-clicky)
- [#Clicky on the Chrome Store](https://chrome.google.com/webstore/detail/clicky-for-slack/bllgmdlgbbmijcoecbnmgeoekhebgmac)

If you've got any feedback on #Clicky, or have any issues, then let me know in the comments below,  or feel free to get in touch with me directly. I'm [@FarPixel](https://www.twitter.com/farpixel) on Twitter, or you can email josh@farrant.me.