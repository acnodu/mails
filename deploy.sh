#!/bin/bash

git reset --hard
git pull

chmod +x deploy.sh

npm install

yarn build

rm -rf /var/www/html/*
mv dist/* /var/www/html
rm -rf dist