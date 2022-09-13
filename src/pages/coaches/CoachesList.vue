<template>
  <BaseDialog :show="!!error" title="error occurred" @close="handleError">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <CoachFilter @change-filter="setFilters"/>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Refresh</BaseButton>
        <BaseButton v-if="!isCoach && !isLoading" link to="/register">Register as Coach</BaseButton>
      </div>
      <div v-if="isLoading">
        <BaseSpinner/>
      </div>
      <ul v-else-if="hasCoaches">
        <CoachItem v-for="coach in filteredCoachList" :key="coach.id" v-bind="coach"/>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </BaseCard>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseCard from '../../components/UI/BaseCard.vue';
import BaseButton from '../../components/UI/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseSpinner from '../../components/UI/BaseSpinner.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';

export default {
  data(){
    return{
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    isCoach(){
      return this.$store.getters['coaches/isCoach']
    },
    filteredCoachList() {
      const coaches = this.$store.getters["coaches/getAllCoaches"];
      const test = coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')) return true
        if(this.activeFilters.backend && coach.areas.includes('backend')) return true
        if(this.activeFilters.career && coach.areas.includes('career')) return true
        return false
      })

      return test
    },
    ...mapGetters("coaches", ["hasCoaches"])
  },
  created(){
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters
    },
    async loadCoaches(){
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/callSetCoaches')
        this.isLoading = false
      } catch (error) {
        this.error = error.message || 'something wrong'
      }
    },
    handleError(){
      this.error = null
    }
  },
  components: { CoachItem, BaseCard, BaseButton, CoachFilter, BaseSpinner, BaseDialog }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>