<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" sm="8" md="4">
      <h1>Add Event</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="event"
          :items="events"
          :rules="[(v) => !!v || 'Event is required']"
          label="Event"
          required
        ></v-select>
        <v-text-field
          v-model="eventAddress"
          label="Event address"
          required
        ></v-text-field>
        <v-select
          v-model="treatedAt"
          :items="hospitals"
          :rules="[(v) => !!v || 'Hospital is required']"
          label="I was treated at"
          required
        ></v-select>
        <v-checkbox
          v-model="wasPreferredHospital"
          label="This was my preferred hospital"
        ></v-checkbox>
        <v-select
          v-show="!wasPreferredHospital"
          v-model="preferredTreatedAt"
          :items="hospitals"
          :rules="[(v) => !!v || 'Hospital is required']"
          label="I preferred being treated at"
          required
        ></v-select>
        <v-btn @click="reset" color="error" class="mr-4">Reset Form</v-btn>
        <v-btn
          :disabled="!valid"
          @click="addEvent"
          color="success"
          class="mr-4"
        >
          Add Event
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
    eventAddress: '',
    treatedAt: null,
    wasPreferredHospital: true,
    preferredTreatedAt: null,
    events: ['Birth', 'Heart Attack', 'Stroke', 'Other'],
    hospitals: ['Elverum', 'Tynset', 'Hamar', 'Lillehammer', 'Gjøvik', 'Other']
  }),

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
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
