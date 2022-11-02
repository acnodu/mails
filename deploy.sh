#!/bin/bash

git reset --hard
git pull

chmod +x deploy.sh

yarn install

yarn build

rm -rf /var/www/html/*
mv dist/* /var/www/html
rm -rf dist