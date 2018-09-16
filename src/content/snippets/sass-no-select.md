## Disable text selection highlighting

Originally written by user Blowsie on [Stack Overflow](https://stackoverflow.com/a/4407335/1431452).

```sass
%noselect {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
```
