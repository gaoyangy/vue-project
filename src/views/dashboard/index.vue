<template>
  <div class="dashboard-container">
    aaa
    <!-- <component :is="currentRole"></component> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {

  }
}
</script>
