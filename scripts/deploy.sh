#!/bin/bash

npm run build

TO_MINIFY="$(ls public/app-*.js)"

./node_modules/uglify-es/bin/uglifyjs $TO_MINIFY --source-map -o $TO_MINIFY

tar cvf farrant-me.tar public/

scp farrant-me.tar farrant.me:

ssh -t farrant.me "/home/joshfarrant/scripts/deploy-farrant-me.sh"