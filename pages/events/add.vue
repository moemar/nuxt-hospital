<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" sm="8" md="4">
      <h1>Legg til hendelse</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="eventType"
          :items="eventTypes"
          :rules="[(v) => !!v || 'Hendelse er påkrevet']"
          item-text="data.name"
          item-value="ref.@ref.id"
          label="Hendelse"
          required
        ></v-select>
        <v-text-field
          v-model="zip"
          label="Postnummeret der jeg bor"
          required
        ></v-text-field>
        <v-select
          v-model="treatedAt"
          :items="hospitals"
          :rules="[(v) => !!v || 'Sykehus er påkrevet']"
          item-text="data.name"
          item-value="ref.@ref.id"
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
          item-value="ref.@ref.id"
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
    eventType: null,
    zip: '',
    treatedAt: null,
    wasPreferredHospital: true,
    preferredTreatedAt: null
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
      const event = {
        eventType: this.eventType,
        zip: this.zip,
        treatedAt: this.treatedAt,
        wasPreferredHospital: this.wasPreferredHospital,
        preferredTreatedAt: this.wasPreferredHospital
          ? this.treatedAt
          : this.preferredTreatedAt
      }

      this.$store.dispatch('events/set', event)
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
