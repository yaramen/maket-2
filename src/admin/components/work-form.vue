<template lang="pug">
    form.works-form(@submit="onSendWork")
        .works-form__header
            .works-form__title Редактирование работы
        .works-form__body
            .works-form__media
                label.works-form__file-area(for="work-file")
                    input.works-form__file(type="file" id="work-file" @change="loadPhoto")
                    img.works-form__image(:src="`${serverBase}${currWork.photo}`" v-if="currWork.photo && !photoUrl")
                    img.works-form__image(:src="photoUrl" v-if="photoUrl")
                    .works-form__file-text Перетащите или загрузите<br>для загрузки изображения<br>
                        .btn.-load Загрузить
            .works-form__content
                .field-group
                    label.field-group__label(for="name") Название
                    input.field-group__field(type="text" id="name" v-model="currWork.title")
                .field-group
                    label.field-group__label(for="link") Ссылка
                    input.field-group__field(type="text" id="link" v-model="currWork.link")
                .field-group
                    label.field-group__label(for="desc") Описание
                    textarea.field-group__field(id="desc" v-model="currWork.description")
                .field-group
                    label.field-group__label(for="tags") Добавленные тэги
                    input.field-group__field(type="text" id="tags" v-model="currWork.techs")
                    ul.tags
                        li.tags__item(v-for="(tag, index) in tags" :key="index")
                            .tags__name {{tag}}
                            button.tags__close(@click.prevent="removeTag(index)")
                .works-form__actions
                    button.btn.-cancel(@click="$emit('cancel')") Отмена
                    button.btn.-save Сохранить
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    props: {
      work: Object,
      add: Boolean,
      edit: Boolean,
    },
    data() {
      return {
        photoUrl: false,
        currWork: this.$props.work,
        isAdd: this.$props.add,
        isEdit: this.$props.edit,
        serverBase: 'https://webdev-api.loftschool.com/'
      }
    },
    computed: {
        tags() {
          if(!this.currWork.techs.includes(',')) {
            return this.currWork.techs.trim() ? [this.currWork.techs] : [];
          }
          return this.currWork.techs.split(',').filter(el => {
            const clearEl = el.trim();
            if(clearEl) {
              return clearEl;
            }
          });
        }
    },
    methods: {
      ...mapActions('works', ['addNewWork', 'updateWork']),
      ...mapActions(['showTooltip']),
      onSendWork() {
        if(!this.validate()) {
          return;
        }

        const formData = new FormData();
        formData.append("title", this.currWork.title);
        formData.append("link", this.currWork.link);
        formData.append("description", this.currWork.description);
        formData.append("techs", this.currWork.techs);
        formData.append("photo", this.currWork.photo);

        console.log(this.currWork);

        if(this.isAdd) {
          this.addNewWork(formData);
        } else {
          this.updateWork({formData, id: this.work.id});
        }
        this.$emit('cancel')
      },
      loadPhoto(e) {
        this.currWork.photo = e.target.files[0];
        const reader = new FileReader();
        try {
          reader.readAsDataURL(this.currWork.photo);
          reader.onload = () => {
            this.photoUrl = reader.result;
          }
        } catch(e) {
          console.log(e);
        }
      },
      validate() {
        if(this.currWork.title.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните название'
          });
          return false;
        }
        if(this.currWork.link.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните ссылку'
          });
          return false;
        }
        if(this.currWork.description.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните описание'
          });
          return false;
        }
        if(this.currWork.techs.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните теги'
          });
          return false;
        }

        if(this.isAdd && !(this.currWork.photo instanceof File)) {
          this.showTooltip({
            type: 'danger',
            message: 'Добавьте картинку'
          });
          return false;
        }

        return true;
      },
      removeTag(index) {
        this.currWork.techs = this.tags.filter((el, i) => i !== index).join(', ');
      }
    }
  }
</script>

<style scoped>

</style>
