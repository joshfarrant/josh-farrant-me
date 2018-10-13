## This Website 🚀

This website is built using a static site generator I developed from the ground up. When I was researching existing static site generators I found that none of the available options did everything that I needed. I wanted a generator with the following qualities:

- At it's core, it's simply a pure Markdown to HTML generator.
- The generated site mustn't include any unnecessary overheads, especially JavaScript^[A strange thing for a JavaScript developer to say, I know.].
- It must have good quality-of-life features for development, such as linting, live-reloading, etc.
- It must have a highly customisable templating engine.
- It must allow me to host and share photos securely.
- It must be able to take recipes in a standard, plain-text format (such as [Open Recipe Format](https://open-recipe-format.readthedocs.io/)) and generate recipe pages from them.
- It must be so simple that I can easily modify and update the content from my phone using just a git client.

With these requirements in mind, I decided to live up to the developer cliché and build my own solution.

I built the core of the generator over the course of a few days whilst on holiday in Italy, sitting in the sun during down-time. Throughout development I kept a few priorities in mind for the site.

1. It should be light-weight.
2. It should be secure.
3. It should be simple, with no unnecessary bloat. That goes for both design, and file sizes.
4. It should be easy to update and maintain.

I'm very happy with how both the generator, and this website, turned out. Now that this site is live I plan to figure out the best way to package the generator up so I can open-source it and make it available to the community.

---

### 🙌 Thanks

Development of this site has been made **infinitely** easier thanks to the countless hours of hard work done by other developers that they have generously decided to open source and make available for free. My heartfelt thanks go out to the developers and maintainers of the following libraries.

- [cloudinary](https://www.npmjs.com/package/cloudinary)
- [emojione](https://www.npmjs.com/package/emojione)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [favicons](https://www.npmjs.com/package/favicons)
- [handlebars](https://www.npmjs.com/package/handlebars)
- [markdown-it](https://www.npmjs.com/package/markdown-it)
- [markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote)
- [markdown-it-prism](https://www.npmjs.com/package/markdown-it-prism)
- [mkdirp](https://www.npmjs.com/package/mkdirp)
- [ncp](https://www.npmjs.com/package/ncp)
- [node-minify](https://www.npmjs.com/package/node-minify)
- [node-sass](https://www.npmjs.com/package/node-sass)
- [prompt](https://www.npmjs.com/package/prompt)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [typography](https://www.npmjs.com/package/typography)
- [yamljs](https://www.npmjs.com/package/yamljs)

I also want to give special thanks to [Emojione](https://www.emojione.com/) for supplying the emoji icons I use on almost every page of the site.

Finally, I'd like to give a shout-out to [Netlify](https://www.netlify.com), who I'm using to host this site. I'd not used them before this project, but they'll be the first place I go for anything similar in the future. I was blown away by how easy it was to get the hosting and continuous deployment set up, their documentation is fantastic, and on top of that they offer it all for free! I should note that I'm not affiliated with them in any way, but I just want to give credit where credit's due and give a shout-out to an amazing service.