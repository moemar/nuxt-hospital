<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" sm="8" md="4">
      <h1>Legg til hendelse</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="event"
          :items="events"
          :rules="[(v) => !!v || 'Hendelse er påkrevet']"
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
import hospitals from '~/apollo/queries/allHospitals'

export default {
  data: () => ({
    valid: true,
    event: null,
    eventZip: '',
    treatedAt: null,
    wasPreferredHospital: true,
    preferredTreatedAt: null,
    events: ['Fødsel', 'Brudd', 'Akutt skade', 'Psykisk', 'Annet'],
    hospitals: ['Elverum', 'Tynset', 'Hamar', 'Lillehammer', 'Gjøvik', 'Other']
  }),
  apollo: {
    hospitals: {
      prefetch: true,
      query: hospitals
    },
    getAuth: () => 'fnADjirFtSACAqMDxZ-GCfuMv1_-0bKRX7CldLLy'
  },
  methods: {
    addEvent() {
      const event = {
        event: this.event,
        treatedAt: this.treatedAt
      }

      this.$store.commit('events/add', event)
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
