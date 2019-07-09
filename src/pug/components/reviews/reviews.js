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
        wrapAround: false,
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
    },
    updateBtnStatus() {
      this.$refs.flickity.on('change', (index) => {
        const flickity = this.$refs.flickity;
        this.$refs.prev.disabled = index === 0;
        this.$refs.next.disabled = index === flickity.data().slides.length - 1
      });
    }
  },
  created() {
    this.reviews = this.requireAvatars(reviews);
  },
  mounted() {
    this.updateBtnStatus();
  }
});
