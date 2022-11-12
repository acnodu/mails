# mails

## Installation

### 1. Install Docker

If you haven't installed Docker yet, install it by running:

```bash
$ curl -sSL https://get.docker.com | sh
$ sudo usermod -aG docker $(whoami)
$ exit
```

### 2. Create a docker-compose.yml file:

```yml
version: '3.8'
services:
  app:
    container_name: mails
    image: 'acnodu/mails:latest'
    restart: unless-stopped
    ports:
      - '5134:8080'
    environment:
      APP_KEY: #Your Application Key
      APP_SECRET: #Your Application Secret
      CONSUMER_KEY: #Your Consumer Key
      AUTH_MD5_PASSWORD: #Your encrypted password in md5

      # OPTIONAL
      ENV_DEFAULT_FORWARD: #Default forwarding email
```

### 3. Bring up your stack by running

```bash
docker-compose up -d
```

### 4. Log in to UI

[http://127.0.0.1:5134](http://127.0.0.1:5134)

<3