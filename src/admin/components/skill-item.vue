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
                input.input-field(v-model="editingSkill.percent")
            td.data-table__edit
                button.data-table__btn(@click="update()") ok
            td.data-table__remove
                button.data-table__btn(@click="undoEdit()") cancel
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
        this.updateSkill(this.editingSkill);
        this.isEdit = false;
      }
    }
  }
</script>

<style scoped>

</style>
