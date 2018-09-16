---
title: How To Prevent Unwanted Code From Ending Up In Your Commits
slug: prevent-unwanted-code-in-commits
date_published: 2016-12-14T21:19:04.000Z
date_updated:   2016-12-15T08:09:23.000Z
tags: Bash, Git, GitHub
---

![Badger debug line](/blog/images/unwanted-commit-bad-commit.png)

Checking the diff of the code that you're about to commit is a good habit to get into, and it's something I try do before committing any changes to the project I'm working on.

Inevitably, however, debug code does slip through the cracks. I can't tell you the number of times I've committed and pushed code, only to then spot a rogue `IT WORKS!` or `myVar: 7` popping up in the console. It then takes a second commit to remove the code with some message along the lines of `Removed debug code`.

This was starting to bother me, so I decided to take action and write a simple pre-commit hook to catch any code that shouldn't be committed.

```bash
#!/bin/sh

for FILE in `git diff-index --cached --name-status HEAD -- | cut -c3-` ; do
    # Check if the file contains 'XXX'
    if grep -q 'XXX' $FILE; then
        echo 'Commit failed:' $FILE 'contains XXX'
        exit 1
    fi
done
exit
```

This code should be added to the `.git/hooks` directory of your git project and named `precommit`.

The code above will be triggered every time you try to commit. Before the commit is initiated, it will look through a diff of your changes for the string `XXX` and, if it finds it, will cause the commit to fail with an appropriate error.

Once that's set up, all you need to do is mark any of your debug lines with a comment of `XXX` as you write them.

```javascript
// app.js
const someVar = myFunction();

// XXX
console.debug('someVar: ', someVar);
```

If you tried to commit this code, it would fail with the error `Commit failed: app.js contains XXX`.

And there you have it! You can now rest assured that none of your debug code will end up immortalised forever in your project's commit history.