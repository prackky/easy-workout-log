#!/bin/bash

cd ~/npq/easy-workout-log/

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

echo "install dependencies"
npm install

echo "package app"
npm run build

echo "deploy"
rm -rf ~/npq/ewolo-api/public
cp -r build ~/npq/ewolo-api/public
