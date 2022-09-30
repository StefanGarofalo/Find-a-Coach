const authModule = {
  state() {
    return {
      userId: null,
      token: null,
      expire: null
    };
  },
  mutations: {
    setUser(state, payload){
      state.token = payload.token
      state.userId = payload.userId
      state.expire = payload.expire
    }
  },
  actions: {
    async signup(context, payload){
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKijAAMOqyLPPVntw6qq_818l06yulWsA',{
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })
      
      const data = await response.json()

      if(!response.ok){
        throw new Error(data.message || 'Failed to auth')
      }

      console.log(data)
      context.commit('setUser', {
        token: data.idToken,
        userId: data.localId,
        expire: data.expiresIn
      })
    },
    login(){}
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
}

export default authModule