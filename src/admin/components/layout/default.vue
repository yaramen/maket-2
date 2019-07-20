<template lang="pug">
    div
        include ../section/header.pug
        main
            section.content
                .content__header
                    .content__title {{title}}
                    .content__add-group
                        button.content__add
                            span.content__add-plus +
                            span.content__add-text Добавить группу
                .content__body
                    router-view
</template>

<script>
  export default {
    data() {
      return {
        title: this.$route.meta.title
      }
    }
  }
</script>

<style scoped>

</style>
