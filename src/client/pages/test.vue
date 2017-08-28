<template lang="pug">
  .test-page
    h1 Test
    nuxt-link(to='/') Home
</template>

<script>
export default {
  name: "TestPage",
  data: () => ({

  })
}
</script>

<style lang="stylus" scoped>
  .test-page
    h1
      color red
</style>
