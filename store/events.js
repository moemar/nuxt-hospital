export const state = () => ({
  list: []
})

export const mutations = {
  add(state, event) {
    state.list.push(event)
  },
  remove(state, { event }) {
    state.list.splice(state.list.indexOf(event), 1)
  }
}
