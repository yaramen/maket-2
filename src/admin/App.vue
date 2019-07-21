<template lang="pug">
    div(class="main" :class="{'-lock': isLock}")
        tooltip
        defaultLayout(v-if="isAuth")
        authLayout(v-if="!isAuth")
</template>

<script>
    import defaultLayout from './components/layout/default';
    import authLayout from './components/layout/auth';
    import tooltip from './components/tooltip';
    import {mapActions, mapState} from 'vuex';

    export default {
      components: {
        defaultLayout,
        authLayout,
        tooltip
      },
      computed: {
        ...mapState('user', {
          isAuth: state => state.isAuth,
          // isLock: state => state.isLock
        }),
        ...mapState({
          isLock: state => state.lock.isLock
        })
      },
      methods: {
        ...mapActions('user', ['checkAuth']),
      },
      created() {
        this.checkAuth();
      }
    }
</script>

<style lang="postcss">
    @import "style/main.pcss";
</style>
