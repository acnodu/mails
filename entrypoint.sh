#!/bin/sh

ROOT_DIR=/app

echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_SERVER_URL|'${VUE_APP_SERVER_URL}'|g' $file
done

http-server .