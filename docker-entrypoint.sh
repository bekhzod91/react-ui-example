#!/bin/sh
set -e

export PROJECT_DIR=/var/www/unkata-ui

# Go to directory
cd $PROJECT_DIR

# Fix go su problem
export HOME=/home/app

if [[ $NODE_ENV == 'testing' ]]; then
    echo "Run testing mode"

    # Change user
    gosu app bash
    source ~/.bashrc

    # Run test
    xvfb-run --server-args='-screen 0, 1024x768x16' yarn test
    exit
else
    echo "Run production mode"

    # Change permission
    chmod 775 -R $PROJECT_DIR/dist
    chown app:app -R $PROJECT_DIR/dist

    # Change user
    gosu app bash
    source ~/.bashrc

    # Build source
    yarn build
    exit
fi
