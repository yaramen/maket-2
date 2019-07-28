<template lang="pug">
    .review-controller
        reviewForm(v-if="isAdd || isEdit" v-on:cancel="cancel" :add="isAdd" :edit="isEdit" :review="formReviewData" :key="formReviewData.id")
        .card-list
            .card-list__col
                button.card-list__add(@click="openFormAdd")
                    .card-list__icon +
                    .card-list__text Добавить<br> отзыв
            reviewCard(v-for="review in reviews" v-on:edit="editReview" :review="review" :key="review.id")
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import reviewForm from '../review-form'
  import reviewCard from '../review-card'

  export default {
    components: {
      reviewForm,
      reviewCard
    },
    data() {
      return {
        isAdd: false,
        isEdit: false,
        reviewData: {
          author: '',
          occ: '',
          text: '',
          photo: '',
        },
        editingReviewId: 0
      }
    },
    computed: {
      ...mapState('reviews', {
        reviews: state => state.reviews
      }),
      formReviewData() {
        let rst = {...this.reviewData};
        if(this.isEdit) {
          rst = {...this.reviews.find(el =>
              el.id === this.editingReviewId
          )};
        }
        return rst;
      }
    },
    methods: {
      ...mapActions('reviews', ['getAllReviews']),
      openFormAdd() {
        this.isAdd = true;
        this.isEdit = false;
      },
      cancel() {
        this.isAdd = false;
        this.isEdit = false;
      },
      editReview(id) {
        this.isEdit = true;
        this.isAdd = false;
        this.editingReviewId = id;
      }
    },
    created() {
      this.getAllReviews();
    }
  }
</script>
