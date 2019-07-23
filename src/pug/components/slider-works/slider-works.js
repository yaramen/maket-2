import Vue from 'vue';
import slideList from './data';
import axios from "../../../admin/request";

new Vue({
  el: "#slider-works-component",
  template: '#slider-works',
  data() {
    return {
      dataSlideList: [],
      currSlideIndex: null,
    };
  },
  computed: {
    currWork() {
      if(this.currSlideIndex === null) {
        return {};
      }
      return this.dataSlideList[this.currSlideIndex];
    },
    slideList() {
      return this.dataSlideList;
    }
  },
  methods: {
    getSlideList() {
      axios.get('/works/147').then(res => {
        this.dataSlideList = res.data;
        this.currSlideIndex = 0
      })
    },
    changeSlide(index) {
      this.currSlideIndex = index;
    },
    prevSlide() {
      if(this.currSlideIndex > 0) {
        this.currSlideIndex -= 1;
      }
    },
    nextSlide() {
      if(this.dataSlideList.length - 1 > this.currSlideIndex) {
        this.currSlideIndex += 1;
      }
    }
  },
  created() {
    this.getSlideList();
  }
});
