export default {
  getAllCoaches(state){
    return state.coaches
  },

  hasCoaches(state){
    return state.coaches && state.coaches.length > 0
  }
}