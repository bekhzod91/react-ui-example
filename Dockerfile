FROM centos

ENV PROJECT_NAME gs1_ui

#####################################
# Install Chrome
#####################################
RUN echo -e '[google-chrome]\n\
name=google-chrome\n\
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch\n\
enabled=1\n\
gpgcheck=1\n\
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub' > /etc/yum.repos.d/google-chrome.repo
RUN yum -y install epel-release
RUN yum install -y google-chrome-stable
RUN yum install -y xorg-x11-server-Xvfb
RUN yum install -y liberation-mono-fonts liberation-narrow-fonts \
                   liberation-sans-fonts liberation-serif-fonts


##############################
# Install gosu
##############################
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
    && curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.2/gosu-amd64" \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.2/gosu-amd64.asc" \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && rm -r /root/.gnupg/ \
    && chmod +x /usr/local/bin/gosu

# Create new user for run app
RUN useradd -u 1000 app

######################################
# Setting Project
######################################
RUN mkdir -p /var/www/$PROJECT_NAME

# Cd to working directory
WORKDIR /var/www/$PROJECT_NAME

# Permission project directory
RUN chmod -R 775 /var/www/$PROJECT_NAME
RUN chown -R app:app /var/www/$PROJECT_NAME

# Change user
USER app

##############################
# Install NVM
##############################
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
RUN source ~/.bashrc && nvm install 8.9.3 > /dev/null
RUN source ~/.bashrc && nvm use 8.9.3

###############################
# Install YARN
###############################
RUN source ~/.bashrc && curl -o- -L https://yarnpkg.com/install.sh | bash > /dev/null

# Copy project files
COPY . /var/www/$PROJECT_NAME

###############################
# Install node dependency
###############################
RUN source ~/.bashrc && yarn install

# Eslint
RUN source ~/.bashrc && yarn lint

# Copy entrypoint script to root directory
COPY ./docker-entrypoint.sh /

# Change to root
USER root

ENTRYPOINT ["/docker-entrypoint.sh"]
