import Vue from 'vue';
import slideList from './data';

new Vue({
  el: "#slider-works-component",
  template: '#slider-works',
  data() {
    return {
      slideList: [],
      currSlideIndex: 0,
    };
  },
  computed: {
    currWork() {
      return this.slideList[this.currSlideIndex];
    }
  },
  methods: {
    getSlideList() {
      return slideList.map(item => ({
        ...item,
        picture: require(`../../../images/${item.picture}`)
      }))
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
      if(this.slideList.length - 1 > this.currSlideIndex) {
        this.currSlideIndex += 1;
      }
    }
  },
  created() {
    this.slideList = this.getSlideList();
    console.log(this.slideList);
  }
});
