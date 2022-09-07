<template>
  <section>
    <BaseCard>
      <h2>Register as a coach</h2>
      <CoachForm/>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import BaseCard from '../../components/UI/BaseCard.vue';
export default {
  components: { CoachForm, BaseCard }
}
</script>