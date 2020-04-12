---
title: Getting Your Own Emoji Domain
slug: getting-your-own-emoji-domain
date_published: 2015-03-04T12:58:00.000Z
date_updated:   2017-06-24T08:57:36.000Z
tags: General, Internet, Emoji
---

The topic of Emoji domains has been back in the news recently, with [Coca-Cola promoting their Emoticoke campaign](http://venturebeat.com/2015/02/19/coke-literally-brings-smiles-to-web-addresses-with-emoji-domain-names/), and you may be wondering how you can get hold of one for yourself. There are a few guides out there which outline how to register an Emoji domain, however they're all a few years old and the methods they used no longer work. Having spent quite a while figuring out how to register my own emoji domain I thought I'd put together a guide to help you avoid some of the issues I encountered and register your own Emoji domain.

![My Code & Coffee Emoji Domain](/blog/images/emoji-domain-ipad.png)

### Background

The idea of having an Emoji domain name is not a new one. The first Emoji domain was registered by [Panic back in 2011](http://www.panic.com/blog/the-worlds-first-emoji-domain/) when they purchased [💩.la](http://💩.la).

![Poopla!](/blog/images/emoji-domain-poopla.png)

If you click through to the link above you'll see that there's still not much there, however you will notice that the domain in your address bar likely no longer shows 💩.la, but rather **xn--ls8h.la**.

### Finding Your Emoji URL

The Washington Post recently published [an article](http://www.washingtonpost.com/news/the-intersect/wp/2015/02/23/the-surprisingly-complex-reason-you-never-see-emoji-urls/) in which it outlines why *"you never see emoji URLs"*, which I'd recommend reading to get a bit of background on the topic. It boils down to the simple fact that the vast majority of top-level domains (such as .com, .net, .org etc) don't allow Emojis to be present in their URLs at all. If you try to register one through any domain registration service you registration will be rejected.

This presents the problem of how to actually go about searching for the domain in the first place. If you try entering an Emoji directly into many domain registrar's search fields you'll likely get an error, or no results at all, as I did on Hover, NameCheap, and 123-reg. The solution is to enter them in [Punycode](http://en.wikipedia.org/wiki/Punycode) form. Punycode allows you to represent Unicode characters with the limited character subset of ASCII supported by the Domain Name System, and so can be used to represent the Unicode Emoji set. There are some good websites out that which will convert Unicode Emojis into Punycode for you, such as [PunyCoder](http://www.punycoder.com/). This explains why we see **xn--ls8h.la** in our address bar when we visit [💩.la](http://💩.la).

![PunyCoder](/blog/images/emoji-domain-punycoder.png)

### Registering Your Emoji Domain

Now we know how to format our URL we simply have to register it. This turned out to be quite a difficult process for a few reasons. Firstly, most domain registrar's search forms wouldn't accept domains in Punycode format and, secondly, the majority of top-level domains won't accept Punycode formatted domains at all. Eventually, after a lot of searching, I came across [IWantMyName.com](https://iwantmyname.com/) which allowed me to enter my desired URL and, after struggling through a search, returned a single TLD, **.ws**. To my surprise IWantMyName allowed me to purchase my domain immediately, and I had it up and running in seconds!

![Emoji domain iPad address bar](/blog/images/emoji-domain-ipad-zoom.png)

[💻☕.ws](http://xn--53hx230o.ws), which I'm calling Code & Coffee, currently just redirects to my personal site at [josh.farrant.me](http://josh.farrant.me), however I may move my blog over to sit on that at some point in the future.

It's worth noting that there may be a few more TLDs, other than .ws, which allow Emoji domains, so definitely check around to see if you can find some alternatives.

### Wrap-Up

I hope that this post has been helpful, and that we get to see a few more Emoji domains out there before they get locked down completely! If you've got any questions, feel free to leave them in the comments below, or tweet me [@FarPixel](http://www.twitter.com/farpixel).

### Update 1 (4/3/15)

The lovely [Kaleigh Rodgers](http://kaleighrogers.com/) from [Motherboard](http://motherboard.vice.com) has been in touch and has subsequently written a great story on [How To Get Your Own Emoji URL](http://motherboard.vice.com/read/i-want-that-hair-flip-girl) based on this piece, which I highly recommend checking out.

### Update 2 (24/6/17)

It looks like there's now an easier way to get your own Emoji domain courtesy of Shane Brunswick. He has created [Domainoji.com](https://domainoji.com/) to simplify the Emoji domain finding and registration process. I've not had chance to try it myself yet, but it certainly looks like it makes the whole process of finding an available Emoji domain a lot easier.

### Update 3 (12/4/20)

The emoji domain 🖥☕️.ws no longer redirects to this blog. After leaving it active for a few years I decided to let the domain lapse.