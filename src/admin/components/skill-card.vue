<template lang="pug">
    .skill-card
        .skill-card__header
            .skill-card__title(v-if="!isEdit") {{category.category}}
            input.input-field.-title(type="text" v-else v-model="editingCategory.title" placeholder="Название новой гуппы")
            .skill-card__control(v-if="isEdit")
                button.btn.-success(@click="doEditCategory(editingCategory)")
                button.btn.-remove(@click="offEdit")
            .skill-card__control(v-if="!isEdit")
                button.btn.-edit(@click="clickEdit")
                button.btn.-remove(@click="removeCategory(category.id)")
        .skill-card__body
            table.data-table
                skillItem(v-for="skill in category.skills" :skill="skill" :key="skill.id")
        form.skill-card__add(@submit.prevent="addNewSkill")
            .skill-card__add-name
                input.input-field(type="text" v-model="skill.title" placeholder="Новый навык")
            .skill-card__add-percent
                input.input-field.-percent(type="number" max="100" v-model="skill.percent")
            .skill-card__add-btn
                button.btn.-add(type="submit") +
</template>

<script>
  import { mapActions } from "vuex";
  import skillItem from './skill-item';

  export default {
    name: "skill-card",
    data() {
      return {
        skill: {
          title: '',
          percent: '',
          category: this.category.id
        },
        isEdit: false,
        editingCategory: {
          title: this.category.category,
          id: this.category.id
        }
      }
    },
    props: {
      category: Object
    },
    components: {
      skillItem
    },
    methods: {
      ...mapActions('skills', ['addSkill', 'removeCategory', 'editCategory']),
      addNewSkill() {
        this.addSkill({...this.skill})
          .then(() => {
            this.skill.title = "";
            this.skill.percent = "";
          });
      },
      clickEdit() {
        this.isEdit = true;
      },
      offEdit() {
        this.isEdit = false;
      },
      doEditCategory(category) {
        this.editCategory(category);
        this.offEdit();
      }
    }
  }
</script>
