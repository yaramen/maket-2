<template lang="pug">
    form.skill-card(@submit="add")
       .skill-card__header
           input.input-field.-title(type="text" v-model="title" placeholder="Название новой гуппы")
           .skill-card__control
               button.btn.-success(type="submit")
               button.btn.-remove(@click="$emit('close-group')")
       .skill-card__body
       .skill-card__add
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        title: '',
      }
    },
    methods: {
      ...mapActions('skills', ['addCategory']),
      ...mapActions(['showTooltip']),
      add() {
        if(this.title.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Название группы должно быть не пустое'
          });
          return;
        }

        this.addCategory(this.title);
        this.$emit('close-group');
      }
    }
  }
</script>
