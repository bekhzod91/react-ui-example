#!/bin/sh
set -e

export PROJECT_DIR=/var/www/unkata-ui/

# Go to directory
cd $PROJECT_DIR

if [[ $NODE_ENV == 'testing' ]]; then
    echo "Run testing mode"

    # Run test
    gosu app source /home/app/.bashrc && xvfb-run --server-args='-screen 0, 1024x768x16' yarn test
    exit
else
    echo "Run production mode"

    # Build source
    gosu app source /home/app/.bashrc && yarn build
    chmod 775 -R $PROJECT_DIR/dist
    chown app:app -R $PROJECT_DIR/dist
    exit
fi
