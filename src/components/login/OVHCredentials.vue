<template>
  <Header title="OVH Credentials" />

  <div class="col-12">
    <div
      class="alert alert-primary"
      role="alert"
    >
      Your OVH credentials are incorrect.<br>
      Follow the OVH documentation to create them.
    </div>
  </div>

  <div class="col-12 mt-4">
    <h4>#1 Create your credentials</h4>
    <p>
      Go on <i class="text-primary">https://www.ovh.com/auth/api/createToken</i> and fill in the information like this:
    </p>

    <img
      :src="setOVHToken"
      class="rounded w-100 mt-3 d-block"
    >
  </div>

  <div class="col-12 mt-5">
    <h4>#2 Update yout docker compose</h4>
    Your <code>docker-compose.yaml</code> should look like this. (replace comments)
    <p>
      <code class="d-block mt-3 p-2 bg-dark rounded"><pre>
version: '3.8'
services:
  app:
    container_name: mails
    image: 'acnodu/mails:latest'
    restart: unless-stopped
    ports:
      - '5134:8080'
    environment:
      - APP_KEY=#Your Application Key
      - APP_SECRET=#Your Application Secret
      - CONSUMER_KEY=#Your Consumer Key
      - AUTH_MD5_PASSWORD=#Your encrypted password in md5
      </pre>
      </code>
    </p>
  </div>

  <div class="col-12 mt-4">
    <h4>#3 ReUP your Docker</h4>
    <p>
      To do this, you need to type this command
      <code class="d-block mt-3 p-2 bg-dark rounded">
        docker-compose up -d
      </code>
    </p>
  </div>

  <div class="col-12 mt-4">
    <h4>#4 Reload your app</h4>
    <p>
      Now, <i
        class="text-primary"
        @click="reload"
      >click here</i>
    </p>
  </div>
</template>

<script setup>
import setOVHToken from '@/assets/imgs/setOVHToken.png';
import { Header } from '@/components';

const reload = () => {
  window.location.reload(true);
};
</script>
