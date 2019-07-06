import Vue from 'vue';
import Flickity from 'vue-flickity';
import reviews from './data';

new Vue({
  el: "#reviews-container",
  template: "#reviews",
  components: {
    Flickity
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        groupCells: true,
        cellAlign: "left"
      }
    }
  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    prev() {
      this.$refs.flickity.previous();
    },
    requireAvatars() {
      return reviews.map(item => {
        return {
          ...item,
          avatar: require("../../../images/" + item.avatar)
        };
      })
    }
  },
  created() {
    this.reviews = this.requireAvatars(reviews);
  }
});
