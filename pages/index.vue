<template>
  <v-row align="center" justify="center">
    <v-col class="text-center">
      <!-- <div>
        <h2>Hospitals:</h2>
        <ul>
          <li v-for="hospital in hospitals" v-bind:key="hospital.data.name">
            {{ hospital.data.name }}
          </li>
        </ul>
      </div> -->
      <v-btn nuxt to="/events/add" color="primary" large>
        Legg til hendelse
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // computed: {
  //   hospitals() {
  //     return this.$store.state.hospitals.list
  //   }
  // },
  // created() {
  //   if (!Array.isArray(this.hospitals) || !this.hospitals.length)
  //     this.$store.dispatch('hospitals/get')
  // }
}
</script>
