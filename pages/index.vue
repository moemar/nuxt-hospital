<template>
  <v-row align="top" justify="center">
    <v-col class="text-center">
      <v-btn nuxt to="/events/add" color="primary" large>
        Legg til hendelse
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.events.list
    }
  }
}
</script>
