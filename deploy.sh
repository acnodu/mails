#!/bin/bash

git pull --rebase

chmod +x deploy.sh

yarn build

rm -rf /var/www/html/*
mv dist/* /var/www/html
rm -rf dist