#!/bin/bash

npm run build

tar cvf farrant-me.tar public/

scp farrant-me.tar farrant.me:

ssh -t farrant.me "/home/joshfarrant/scripts/deploy-farrant-me.sh"