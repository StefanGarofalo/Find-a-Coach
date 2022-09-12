<template>
  <section>
    <BaseCard>
      <header>
        <h2>Requests received</h2>
      </header>
      <ul v-if="hasRequests">
        <RequestItem v-for="req in receivedRequests" :key="req.id" :email="req.userEmail" :message="req.message"/>
      </ul>
      <h3 v-else>No requests yet</h3>
    </BaseCard>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default{
  computed: {
    receivedRequests() {
        return this.$store.getters["requests/getAllRequests"];
    },
    hasRequests() {
        return this.$store.getters["requests/hasRequests"];
    }
  },
  components: { RequestItem }
}
</script>

<style scoped>
  header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>