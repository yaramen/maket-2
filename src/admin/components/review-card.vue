<template lang="pug">
    .card-list__col
        .card.-review
            .card__header
                img.card__image(:src="`${server}${review.photo}`")
                .card__auth
                    .card__auth-name {{review.author}}
                    .card__auth-role {{review.occ}}
            .card__content
                .card__desc {{review.text}}
            .card__control
                button.btn.-card-edit(@click="$emit('edit', review.id)") Править
                button.btn.-card-remove(@click="removeReview(review.id)") Удалить
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    props: {
      review: Object
    },
    data() {
      return {
        server: 'https://webdev-api.loftschool.com/'
      }
    },
    methods: {
      ...mapActions('reviews', ['removeReview'])
    }
  }
</script>

<style scoped>

</style>
