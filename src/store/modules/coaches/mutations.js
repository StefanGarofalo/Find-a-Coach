export default {
  registerCoach(state, payload){
    state.coaches.push(payload)
    state.isCoach = true
  },
  setCoaches(state, payload){
    state.coaches = payload
  }
}