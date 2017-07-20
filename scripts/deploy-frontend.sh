#!/bin/bash

cd ~/npq/easy-workout-log/

echo "clean up modifications"
git checkout .

echo "clean dependencies"
rm -rf node_modules/

echo "get new tags from remote"
git fetch --tags

tag=$1

if [ $tag ]
then
  echo "use specified tag"
else
  echo "get latest tag name"
  tag=$(git describe --tags `git rev-list --tags --max-count=1`)
fi

echo "checkout tag"
git checkout $tag

if [ $? -ne 0 ]
then
  echo "could not checkout tag"
  exit 1  
fi

echo "install dependencies"
npm install --prefer-offline

echo "package app"
npm run build

echo "deploy"
rm -rf ~/npq/ewolo-api/public
cp -r build ~/npq/ewolo-api/public

echo "restart server"
~/npq/ewolo-api/scripts/start.sh
