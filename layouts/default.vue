<template>
  <v-app dark>
    <app-bar></app-bar>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" lg="7" xl="5">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/common/AppBar.vue";

export default {
  components: {
    AppBar
  }
};
</script>
