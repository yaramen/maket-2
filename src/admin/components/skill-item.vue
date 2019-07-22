<template lang="pug">
    tr.data-table__row
        template(v-if="!isEdit")
            td.data-table__name {{skill.title}}
            td.data-table__percent {{skill.percent}}
            td.data-table__edit
                button.data-table__btn(@click="edit()")
                    .data-table__icon.-edit
            td.data-table__remove
                button.data-table__btn.-remove(@click="deleteSkill(skill)")
                    .data-table__icon.-remove
        template(v-if="isEdit")
            td.data-table__name
                input.input-field(v-model="editingSkill.title")
            td.data-table__percent
                input.input-field(type="number" max="100" v-model="editingSkill.percent")
            td.data-table__edit
                button.data-table__btn(@click="update()")
                    .data-table__icon.-success
            td.data-table__remove
                button.data-table__btn(@click="undoEdit()")
                    .data-table__icon.-cancel
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    props:  {
      skill: Object
    },
    data() {
      return {
        isEdit: false,
        editingSkill: {}
      }
    },
    methods: {
      ...mapActions('skills', ['removeSkill', 'updateSkill']),
      ...mapActions(['showTooltip']),
      deleteSkill(skill){
        this.removeSkill(skill)
      },
      edit() {
        this.isEdit = true;
        this.editingSkill = {...this.skill};
      },
      undoEdit(){
        this.isEdit = false;
      },
      update(){
        if(this.editingSkill.title.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Поле навык должно быть не пустое'
          });
          return;
        }
        if(+this.editingSkill.percent <= 0 || +this.editingSkill.percent > 100) {
          this.showTooltip({
            type: 'danger',
            message: 'Поле проценты должно быть от 0 до 100'
          });
          return;
        }
        this.updateSkill(this.editingSkill);
        this.isEdit = false;
      }
    }
  }
</script>

<style scoped>

</style>
