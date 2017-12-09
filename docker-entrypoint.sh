#!/bin/sh
set -e

export PROJECT_DIR=/var/www/unkata-ui

# Go to directory
cd $PROJECT_DIR

# Change permission
chmod 775 -R $PROJECT_DIR/dist
chown app:app -R $PROJECT_DIR/dist

# Fix go su problem
export HOME=/home/app

gosu app bash

source ~/.bashrc

if [[ $NODE_ENV == 'testing' ]]; then
    echo "Run testing mode"

    # Run test
    xvfb-run --server-args='-screen 0, 1024x768x16' yarn test
    exit
else
    echo "Run production mode"

    # Build source
    yarn build
    exit
fi
