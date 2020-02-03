export const state = () => ({
  list: [],
  eventType: {}
})

export const mutations = {
  set(state, eventTypes) {
    state.list = eventTypes
  },
  add(state, eventType) {
    state.list.push(eventType)
  },
  remove(state, { eventType }) {
    state.list.splice(state.list.indexOf(eventType), 1)
  },
  setCar(state, eventType) {
    state.eventType = eventType
  }
}

export const actions = {
  async get({ commit }) {
    await this.$axios.get('/.netlify/functions/allEventTypes').then((res) => {
      if (res.status === 200) {
        commit('set', res.data)
      }
    })
  }
}
