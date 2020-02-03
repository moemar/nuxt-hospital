export const state = () => ({
  list: [],
  hospital: {}
})

export const mutations = {
  set(state, hospitals) {
    state.list = hospitals
  },
  add(state, hospital) {
    state.list.push(hospital)
  },
  remove(state, { hospital }) {
    state.list.splice(state.list.indexOf(hospital), 1)
  },
  setCar(state, hospital) {
    state.hospital = hospital
  }
}

export const actions = {
  async get({ commit }) {
    await this.$axios.get('/.netlify/functions/allHospitals').then((res) => {
      if (res.status === 200) {
        commit('set', res.data)
      }
    })
  }
}
