#!/bin/sh
set -e

export HOME=/home/app
export PROJECT_DIR=/var/www/gs1_ui

# Go to directory
cd $PROJECT_DIR

if [[ $NODE_ENV == 'testing' ]]; then
    echo "Run testing mode"

    # Run test
    gosu app xvfb-run --server-args='-screen 0, 1024x768x16' yarn test
    exit
else
    echo "Run production mode"

    # Change permission
    chmod 775 -R $PROJECT_DIR/dist
    chown app:app -R $PROJECT_DIR/dist

    # Build source
    gosu app yarn run clean
    gosu app yarn build
    exit
fi
