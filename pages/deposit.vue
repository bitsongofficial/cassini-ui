<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-container>
        <v-row>
          <v-col cols="12">
            <nuxt-link to="/"><- Back</nuxt-link>
            <h1 class="headline my-4">Deposit</h1>

            <div class="d-flex">
              <div class="d-flex flex-column flex-grow-1 flex-shrink-0">
                <div class="overline">FROM</div>
                <v-card class="pa-2" height="80">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Ethereum Mainnet</v-list-item-title
                      >

                      <v-list-item-subtitle>0x00000000</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </div>

              <div class="d-flex align-center pa-4">
                <v-icon class="pt-8">mdi-arrow-right</v-icon>
              </div>

              <div class="d-flex flex-column flex-grow-1 flex-shrink-0">
                <div class="overline">TO</div>
                <v-card class="pa-2" height="80">
                  <v-list-item class="pt-1">
                    <v-list-item-avatar>
                      <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >BitSong Mainnet</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12"
            ><v-text-field outlined label="BitSong address"></v-text-field>
            <v-text-field outlined label="Amount"></v-text-field>
            <v-btn block large color="primary">Next</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
