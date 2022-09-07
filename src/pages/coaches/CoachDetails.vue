<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>{{ rate }}</h3>
    </BaseCard>
  </section>
  <section>
    <header>
      <BaseCard>
        <h2>Interested? Reach out!</h2>
        <BaseButton link :to="contactLink">Contact</BaseButton>
      </BaseCard>
    </header>
    <RouterView/>
  </section>
  <section>
    <BaseCard>
      <BaseBadge v-for="area in areas" :key="area" :title="area" :type="area"/>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
export  default {
  props: ['id'],
  data(){
    return{
      selectedCoach: null
    }
  },
  computed: {
    fullName(){
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },
    contactLink(){
      return this.$route.path + '/' + this.id + '/contact'
    },
    areas(){
      return this.selectedCoach.areas
    },
    rate(){
      return this.selectedCoach.hourlyRate
    },
    description(){
      return this.selectedCoach.description
    }
  },
  created(){
    this.selectedCoach = this.$store.getters['coaches/getAllCoaches'].find(coach => coach.id === this.id)
  }
}

</script>