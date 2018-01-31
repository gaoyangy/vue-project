<template>
  <div class="dashboard-container">
    aaa
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.$http.post('add/user', { a: 'aaaa' }).then(data => {
      console.log(data)
    })
  }
}
</script>
