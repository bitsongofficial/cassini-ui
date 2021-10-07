<template>
  <v-card class="pa-2" style="background-color:hsla(0,0%,100%,.04)" height="78">
    <v-list-item class="pl-1">
      <v-list-item-avatar
        :color="network.toLowerCase() === `ethereum` ? `white` : ``"
      >
        <img :src="`/${network.toLowerCase()}.svg`" :alt="network" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="font-weight-bold"
          >{{ network }} Mainnet</v-list-item-title
        >

        <v-list-item-subtitle>{{ address }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    network: String,
    address: {
      type: String,
      require: false
    }
  }
};
</script>
