---
title: How to Access The Store From An Ember Component (The Right Way)
slug: how-to-access-the-store-from-an-ember-component
date_published: 2015-12-07T15:11:45.000Z
date_updated:   2016-01-12T14:32:03.000Z
tags: JavaScript, Ember-Data, Ember
---

I've been working with Ember for little over a year now, and in that time I've seen the framework shift towards favouring standalone components more and more.

This is fantastic; components encourage you to write more modular and reusable code, and as an added bonus their implementation aligns with [Web Component](http://webcomponents.org/) standards.

In general, Ember components should be designed to work in complete isolation, without any knowledge of the surrounding context or controller, and instead should rely on passed in parameters to add context. Designing components in this way allows you to easily reuse them anywhere within your app, or even within other apps.

That being said, sometimes it is convenient to give a component access to aspects of the context it is being used in, such as the store. It is possible to pass these contexts in as parameters using the component in a template, although it's far from ideal.

```hbs
<!-- You shouldn't be doing this -->

{{my-component
  store=store}}
```

Passing a reference to the store through the component in this way does work, but it's considered bad practice and shouldn't be relied on. Not to mention that it can quickly become messy if you're nesting components inside other components.

```hbs
{{#my-containing-component store=store}}
  {{my-nested-component
    store=store}}
{{/my-containing-component}}
```

### The Solution

Fortunately, Ember has a built-in method which lets you access the store (and in fact any [service](http://emberjs.com/api/classes/Ember.Service.html)) from within your components; `Ember.inject.service()`.

Using Ember's dependency injection to access the store from within a component couldn't be easier, you just need to define a computed property in your component as follows.

```js
// app/components/awesome-component.js
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service()
});
```

That's it! You can now access the store from anywhere within this component as you would any other computed property.

```js
// app/components/awesome-component.js
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    newPost: function() {
      // Fetch reference to store as a
      // property on this component
      var store = this.get('store');

      store.createRecord('post');
    }
  }
});
```

You may have noticed that we've not passed any parameters to the `Ember.inject.service()` function, so how does it know that we're trying to retrieve the injected store and not any other service? Simple; if we don't pass a service name as a parameter to the function it will automatically try to retrieve the service with the same name as the computed property it is defined as. For example:

```js
// This works because a service named 'store'
// exists, and so it is injected
store: Ember.inject.service()

// This won't work, because there is no service
// with the name 'myStore'
myStore: Ember.inject.service()

// This will work, because we're explicitly passing
// the name of the service to inject, 'store'
myStore: Ember.inject.service('store')
```

It's also worth noting that, when Ember Data is initialized, it automatically injects the store into all components for you, so it's ready to access in the way described above whenever you need it. If you're trying to access a service other than the store which is not automatically injected then you will need to inject it yourself from an initializer as follows.

```js
// my-initializer.js
application.inject('component:awesome-component', 'myService', 'service:myService');
```

### Wrap-up

I spent far too long during my early days of working with Ember hacking the store into my components before realizing that dependency injection solves this problem for me. Hopefully you can learn from my mistakes!
