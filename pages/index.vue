<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="headline mb-4">BitSong Bridge</h1>

        <v-card
          class="mb-4"
          :to="card.link"
          v-for="(card, i) in cards"
          :key="i"
        >
          <v-card-title>{{ card.title }} </v-card-title>
          <v-card-text class="body-1">
            <p>{{ card.description }}</p>
          </v-card-text>
        </v-card>

        <div class="text-center">Watch the video tutorial -></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "Deposit",
          description: "Transfer your bitsong assets to BitSong Mainnet",
          link: "/deposit",
        },
        {
          title: "Withdraw",
          description: "Transfer your bitsong assets to Ethereum Mainet",
          link: "/",
        },
      ],
    };
  },
};
</script>
