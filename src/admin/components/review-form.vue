<template lang="pug">
    form.review-form(@submit="onSendReview")
        .review-form__header
            .review-form__title Новый отзыв
        .review-form__body
            label.review-form__media(for="avatar-file")
                input.review-form__file(type="file" id="avatar-file" @change="loadPhoto")
                img.review-form__avatar(:src="photoDefault" v-if="!review.photo")
                img.review-form__avatar(:src="`${serverBase}${review.photo}`" v-if="review.photo && !photoUrl")
                img.review-form__avatar(:src="photoUrl" v-if="review.photo && photoUrl")
                .review-form__avatar-label Добавить фото
            .review-form__content
                .review-form__group
                    .field-group
                        label.field-group__label(for="auth-name") Имя автора
                        input.field-group__field(type="text" id="auth-name" v-model="currReview.author" placeholder="Введите имя")
                    .field-group
                        label.field-group__label(for="auth-role") Титул автора
                        input.field-group__field(type="text" id="auth-role" v-model="currReview.occ" placeholder="Введите ")
                .field-group
                    label.field-group__label(for="auth-desc") Отзыв
                    textarea.field-group__field(id="auth-desc" v-model="currReview.text")
                .review-form__actions
                    button.btn.-cancel(@click="$emit('cancel')") Отмена
                    button.btn.-save(type="submit") Сохранить
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    props: {
      review: Object,
      add: Boolean,
      edit: Boolean,
    },
    data() {
      return {
        photoDefault: require('../../images/content/avatar-default.png'),
        photoUrl: false,
        currReview: this.$props.review,
        isAdd: this.$props.add,
        isEdit: this.$props.edit,
        serverBase: 'https://webdev-api.loftschool.com/'
      }
    },
    methods: {
      ...mapActions('reviews', ['addNewReview', 'updateReview']),
      ...mapActions(['showTooltip']),
      onSendReview() {
        if(!this.validate()) {
          return;
        }

        const formData = new FormData();
        formData.append("author", this.review.author);
        formData.append("occ", this.review.occ);
        formData.append("text", this.review.text);
        formData.append("photo", this.review.photo);

        if(this.isAdd) {
          this.addNewReview(formData);
        } else {
          this.updateReview({formData, id: this.review.id});
        }
        this.$emit('cancel')
      },
      loadPhoto(e) {
        this.review.photo = e.target.files[0];
        const reader = new FileReader();
        try {
          reader.readAsDataURL(this.review.photo);
          reader.onload = () => {
            this.photoUrl = reader.result;
          }
        } catch(e) {
          console.log(e);
        }
      },
      validate() {
        if(this.review.author.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните имя автора'
          });
          return false;
        }
        if(this.review.occ.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните титул автора'
          });
          return false;
        }
        if(this.review.text.length === 0) {
          this.showTooltip({
            type: 'danger',
            message: 'Заполните отзыв'
          });
          return false;
        }

        if(this.isAdd && !(this.review.photo instanceof File)) {
          this.showTooltip({
            type: 'danger',
            message: 'Добавьте аватар'
          });
          return false;
        }

        return true;
      },
    }
  }
</script>

<style>

</style>
