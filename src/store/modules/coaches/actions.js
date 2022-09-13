export default {
  async registerCoach(context, data){
    const coachId = context.rootGetters.getId
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.areas,
      description:  data.description,
      hourlyRate: data.rate
    }

    /*const res = */await fetch(`https://vue-http-udemy-3b5cd-default-rtdb.europe-west1.firebasedatabase.app/coaches/${coachId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })
    //const data = await res.json()

    context.commit('registerCoach', {
      coachId,
      ...coachData
    })
  },
  async callSetCoaches(context){
    const res = await fetch(`https://vue-http-udemy-3b5cd-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`)
    const data = await res.json()
    
    if(!res.ok){
      const error = new Error(data.message || 'failed to fetch')
      throw error
    }

    const coaches = []
    for(const key in data){
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        areas: data[key].areas,
        description:  data[key].description,
        hourlyRate: data[key].rate
      }
      coaches.push(coach)
    }
    
    context.commit('setCoaches', coaches)
  }
}