<template lang="pug">
    .skills-controller
        .content__add-group
            button.content__add(@click="addNewGroup")
                span.content__add-plus +
                span.content__add-text Добавить группу
        .skills-controller__container
            skillForm(v-if="isAddGroup" v-on:close-group="closeNewGroup()")
            skillCard(v-for="category in categories" :category="category" v-bind:key="category.id")

</template>

<script>
  import { mapActions, mapState } from "vuex";
  import skillCard from '../skill-card';
  import skillForm from '../skill-form';

  export default {
    components: {
      skillCard,
      skillForm
    },
    data() {
      return {
        isAddGroup: false
      }
    },
    computed: {
      ...mapState('skills', {
        categories: state => state.categories
      })
    },
    methods: {
      ...mapActions('skills', ['getSkills']),
      addNewGroup() {
        this.isAddGroup = true;
      },
      closeNewGroup() {
        this.isAddGroup = false;
      }
    },
    created() {
      this.getSkills();
    }
  }
</script>


