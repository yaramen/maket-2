<template lang="pug">
    div
        defaultLayout(v-if="isAuth")
        authLayout(v-if="!isAuth")
</template>

<script>
    import defaultLayout from './components/layout/default'
    import authLayout from './components/layout/auth'


    export default {
      components: {
        defaultLayout,
        authLayout
      },
      data() {
        return {
          isAuth: true
        }
      }
    }
</script>

<style lang="postcss">
    @import "style/main.pcss";
</style>
