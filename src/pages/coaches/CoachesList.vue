<template>
  <section>
    FILTER
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton link to="/register">Register as Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
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

export default {
  computed: {
    filteredCoachList() {
        return this.$store.getters["coaches/getAllCoaches"];
    },
    ...mapGetters("coaches", ["hasCoaches"])
  },
  components: { CoachItem, BaseCard, BaseButton }
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