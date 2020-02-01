<template>
  <v-row align="center" justify="center">
    <v-col class="text-center">
      <div>
        <h2>Hospitals:</h2>
        <ul>
          <li v-for="hospital in hospitals" v-bind:key="hospital.data.name">
            {{ hospital.data.name }}
          </li>
        </ul>
      </div>
      <v-btn nuxt to="/events/add" color="primary" large>
        Legg til hendelse
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      hospitals: [],
      error: null
    }
  },
  created() {
    this.hospitals = this.getAllHospitals()
  },
  methods: {
    async getAllHospitals() {
      try {
        const res = await this.$axios.$get('/.netlify/functions/get')
        this.hospitals = res
        this.error = null
      } catch (e) {
        this.error = e.response
        this.hospitals = []
      }
    }
  }
}
</script>
