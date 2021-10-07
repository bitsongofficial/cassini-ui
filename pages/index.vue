<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="headline mb-4">BitSong Bridge</h1>
            <v-card class="mb-4" to="/deposit">
              <v-card-title>Deposit</v-card-title>
              <v-card-text class="body-1">
                <p>Transfer your bitsong assets to BitSong Mainnet</p>
              </v-card-text>
            </v-card>
            <v-card class="mb-4" to="/withdraw">
              <v-card-title>Withdraw</v-card-title>
              <v-card-text class="body-1">
                <p>Transfer your bitsong assets to Ethereum Mainet</p>
              </v-card-text>
            </v-card>
            <div class="text-center">Watch the video tutorial -></div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
