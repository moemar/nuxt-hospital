<template>
  <v-row align="top" justify="center">
    <v-col class="text-center">
      <h2>Events</h2>
      <ul>
        <li v-for="item in items" v-bind:key="item.event">
          {{ item.event }}
        </li>
      </ul>
      <v-btn v-on="on" nuxt to="/add" color="primary" large>
        Add event
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
