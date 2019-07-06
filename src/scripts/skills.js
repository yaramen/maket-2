import Vue from 'vue';
import skills from './../pug/components/skills/skills';

const skill = {
  template: "#skill",
  props: {
    name: String,
    percent: Number
  }
};

const skillList = {
  template: "#skill-list",
  props: {
    skills: Object
  },
  components: {
    skill
  }
};

const skillsGroup = {
  template: "#skills-group",
  props: {
    skillGroupList: Object
  },
  components: {
    skillList
  }
};

new Vue({
  el: "#skills-component",
  template: '#skills-template',
  data() {
    return {
      skills: []
    };
  },
  components: {
    skillsGroup
  },
  created() {
    this.skills = skills;
  }
});
