#!/bin/sh

ROOT_DIR=/app

echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|ENV_APP_KEY|'${APP_KEY}'|g' $file
  sed -i 's|ENV_APP_SECRET|'${APP_SECRET}'|g' $file
  sed -i 's|ENV_CONSUMER_KEY|'${CONSUMER_KEY}'|g' $file
  sed -i 's|ENV_AUTH_MD5_PASSWORD|'${AUTH_MD5_PASSWORD}'|g' $file
  sed -i 's|ENV_DEFAULT_FORWARD|'${ENV_DEFAULT_FORWARD}'|g' $file
done

http-server .