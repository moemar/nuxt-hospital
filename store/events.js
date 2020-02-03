export const state = () => ({
  list: [],
  event: {}
})

export const mutations = {
  set(state, events) {
    state.list = events
  },
  add(state, event) {
    state.list.push(event)
  },
  remove(state, { event }) {
    state.list.splice(state.list.indexOf(event), 1)
  },
  setCar(state, event) {
    state.event = event
  }
}

export const actions = {
  async get({ commit }) {
    await this.$axios.get('/.netlify/functions/allEvents').then((res) => {
      if (res.status === 200) {
        commit('set', res.data)
      }
    })
  },
  async set({ commit }, event) {
    await this.$axios
      .post('/.netlify/functions/createEvent', event)
      .then((res) => {
        if (res.status === 200) {
          // commit('set', res.data)
        }
      })
  }
}
