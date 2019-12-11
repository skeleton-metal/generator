export const state = () => ({
  modules: ["ASD"]
})
export const getters = {
  getModules: (state) => {
    return state.modules
  }
}

export const mutations = {
  add(state, text) {
    state.modules.push({
      text,
      done: false
    })
  },
  remove(state, {todo}) {
    state.modules.splice(state.modules.indexOf(todo), 1)
  }
}
