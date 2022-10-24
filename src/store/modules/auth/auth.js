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
    logout(context){
      context.commit('setUser', {
        userId: null,
        token: null,
        expire: null
      })
    },
    
    async login(context, payload){
      return context.dispatch('auth', { ...payload, mode: 'login' })
    },

    async signup(context, payload){
      return context.dispatch('auth', { ...payload, mode: 'login' })
    },

    async auth(context, payload){
      const mode = payload.mode
      const url = mode === 'login' ? 
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKijAAMOqyLPPVntw6qq_818l06yulWsA' 
        :
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKijAAMOqyLPPVntw6qq_818l06yulWsA'
      if(mode === 'login'){
        const response = await fetch(url, {
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

        context.commit('setUser', {
          token: data.idToken,
          userId: data.localId,
          expire: data.expiresIn
        })
      }
      if(mode === 'signup'){
        const response = await fetch(url, {
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

        context.commit('setUser', {
          token: data.idToken,
          userId: data.localId,
          expire: data.expiresIn
        })
      }
    }
      
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state){
      return state.token
    },
    isAuthenticated(state){
      return !!state.token
    }
  }
}

export default authModule