let timer

const authModule = {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: null
    };
  },
  mutations: {
    setUser(state, payload){
      state.token = payload.token
      state.userId = payload.userId
      state.didAutoLogout = false
    },

    setAutoLogout(state){
      state.didAutoLogout = true
    }
  },
  actions: {
    autoLogin(context){
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const expire = localStorage.getItem('expire')

      const expiresIn = +expire - new Date().getTime()
      if(expiresIn < 10000){
        return
      }

      timer = setTimeout(() => {
        context.dispatch('autoLogout')
      }, expiresIn)

      if(token && userId){
        context.commit('setUser', {
          token,
          userId,
        })
      }
    },

    logout(context){
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expire')

      clearTimeout(timer)

      
      context.commit('setUser', {
        userId: null,
        token: null
      })
    },

    async login(context, payload){
      return context.dispatch('auth', { ...payload, mode: 'login' })
    },

    async signup(context, payload){
      return context.dispatch('auth', { ...payload, mode: 'login' })
    },

    autoLogout(context){
      context.dispatch('logout')
      context.commit('setAutoLogout')
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
        
        const expiresIn = +data.expiresIn * 1000
        const expireDate = new Date().getTime() + expiresIn
        
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expire', expireDate)

        timer = setTimeout(() => {
          context.dispatch('autoLogout')
        }, expiresIn)

        context.commit('setUser', {
          token: data.idToken,
          userId: data.localId,
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

        const expiresIn = +data.expiresIn * 1000
        const expireDate = new Date().getTime() + expiresIn
        
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expire', expireDate)

        timer = setTimeout(() => {
          context.dispatch('autoLogout')
        }, expiresIn)

        context.commit('setUser', {
          token: data.idToken,
          userId: data.localId,
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
    },
    didAutoLogout(state){
      return state.didAutoLogout
    }
  }
}

export default authModule