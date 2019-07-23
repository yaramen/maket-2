import Vue from 'vue';
import Flickity from 'vue-flickity';
import axios from "../../../admin/request";

new Vue({
  el: "#reviews-container",
  template: "#reviews",
  components: {
    Flickity,
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        groupCells: true,
        cellAlign: "left"
      },
      dataReviews: [],
      isLoad: false
    }
  },
  computed: {
    reviews() {
      return this.dataReviews
    }
  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    prev() {
      this.$refs.flickity.previous();
    },
    getReviews() {
      axios.get('/reviews/147').then(res => {
        this.dataReviews = res.data;
        this.isLoad = true;
        this.updateBtnStatus();
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
    this.getReviews();
  },
});
