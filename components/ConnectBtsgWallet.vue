<template>
  <v-card>
    <v-card-title>Select wallet</v-card-title>
    <v-card-text>
      <v-card outlined class="mb-4">
        <v-list-item @click.stop="">
          <v-list-item-avatar>
            <img src="/keplr.svg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Keplr</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-card-text>
  </v-card>
</template>
