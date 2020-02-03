<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" sm="8" md="4">
      <h1>Legg til hendelse</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="event"
          :items="eventTypes"
          :rules="[(v) => !!v || 'Hendelse er påkrevet']"
          item-text="data.name"
          label="Hendelse"
          required
        ></v-select>
        <v-text-field
          v-model="eventZip"
          label="Postnummeret der jeg bor"
          required
        ></v-text-field>
        <v-select
          v-model="treatedAt"
          :items="hospitals"
          :rules="[(v) => !!v || 'Sykehus er påkrevet']"
          item-text="data.name"
          label="Jeg ble behandlet på sykehuset i"
          required
        ></v-select>
        <v-checkbox
          v-model="wasPreferredHospital"
          label="Ja, dette var mitt foretrukne sykehus"
        ></v-checkbox>
        <v-select
          v-show="!wasPreferredHospital"
          v-model="preferredTreatedAt"
          :items="hospitals"
          :rules="[(v) => !!v || 'Sykehus er påkrevet']"
          item-text="data.name"
          label="Jeg ønsket å bli behandlet på sykehuset i"
          required
        ></v-select>
        <v-btn @click="reset" color="error" class="mr-4">Tøm skjema</v-btn>
        <v-btn
          :disabled="!valid"
          @click="addEvent"
          color="success"
          class="mr-4"
        >
          Registrer hendelse
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    event: null,
    eventZip: '',
    treatedAt: null,
    wasPreferredHospital: true,
    preferredTreatedAt: null
    // eventTypes: ['Fødsel', 'Brudd', 'Akutt skade', 'Psykisk', 'Annet'],
    // hospitals: ['Elverum', 'Tynset', 'Hamar', 'Lillehammer', 'Gjøvik', 'Other']
  }),
  computed: {
    hospitals() {
      return this.$store.state.hospitals.list
    },
    eventTypes() {
      return this.$store.state.eventTypes.list
    }
  },
  created() {
    this.$store.dispatch('hospitals/get')
    this.$store.dispatch('eventTypes/get')
  },
  methods: {
    addEvent() {
      // const event = {
      //   event: this.event,
      //   treatedAt: this.treatedAt
      // }

      // this.$store.commit('events/add', event)
      this.$store.dispatch('events/set')
      this.reset()
    },
    validate() {
      if (this.$refs.form.validate()) {
        //
      }
    },
    reset() {
      this.$refs.form.reset()
      this.wasPreferredHospital = true
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
