<template lang="pug">
    .card-list__col
        .card.-works
            .card__header
                img.card__image(:src="`${server}${work.photo}`" width="100%")
                .card__tags
                    .card__tags-item(v-for="tag in tags") {{tag}}
            .card__content
                h2.card__title {{work.title}}
                .card__desc {{work.description}}
                a.card__link(:href="work.link") {{work.link}}
            .card__control
                button.btn.-card-edit(@click="$emit('edit', work.id)") Править
                button.btn.-card-remove(@click="removeWork(work.id)") Удалить

</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    props: {
      work: Object
    },
    data() {
      return {
        currWork: {...this.$props.work}
      }
    },
    computed: {
      tags() {
        if(!this.work.techs.includes(',')) {
          return [this.work.techs];
        }
        return this.work.techs.split(',').filter(el => {
          const clearEl = el.trim();
          if(clearEl) {
            return clearEl;
          }
        });
      }
    },
    data() {
      return {
        server: 'https://webdev-api.loftschool.com/'
      }
    },
    methods: {
      ...mapActions('works', ['removeWork'])
    }
  }
</script>

<style scoped>

</style>
