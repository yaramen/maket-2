<template lang="pug">
    div
        headerLayout
        main
            section.content
                .content__header
                    .content__title {{title}}
                .content__body
                    router-view
</template>

<script>
    import headerLayout from '../header'

  export default {
    components: {
      headerLayout
    },
    computed: {
      title() {
        return this.$route.meta.title
      }
    }
  }
</script>
