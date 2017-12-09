#!/bin/sh
set -e

export PROJECT_DIR=/var/www/unkata-ui/
source ~/.bashrc

# Go to directory
cd $PROJECT_DIR

if [[ $NODE_ENV == 'testing' ]]; then
    echo "Run testing mode"

    # Run test
    xvfb-run --server-args='-screen 0, 1024x768x16' yarn test
    exit
else
    echo "Run production mode"

    # Run project
    yarn startpro
    exit
fi
