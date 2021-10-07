<template>
  <v-app dark>
    <v-app-bar app flat hide-on-scroll height="80">
      <nuxt-link to="/">
        <img alt="BitSong" min-width="135" width="160" src="/logo-white.svg" />
      </nuxt-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
