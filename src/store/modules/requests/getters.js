export default {
  getAllRequests(state, _, _2, rootGetters){
    const coachId = rootGetters.getId
    console.log(state.requests)
    console.log(coachId)
    return state.requests.filter(req => req.coachId === coachId)
  },
  hasRequests(_, getters){
    return getters.getAllRequests && getters.getAllRequests.length > 0
  }
}