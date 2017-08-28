<template lang="pug">
  .landing-page
    h1 Landing
    nuxt-link(to='/test') Test
</template>

<script>
export default {
  name: 'LandingPage',
  data: () => ({

  })
}
</script>

<style lang="stylus" scoped>
  .landing-page
    h1
      color blue
</style>
