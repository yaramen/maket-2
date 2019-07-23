import Vue from 'vue';
import skills from './data';
import ServiceSkill from "../../../admin/service/skills";

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
    skills: Array
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
      // skills: [],
      categories: [],
      categoriesSkills: []
    };
  },
  components: {
    skillsGroup
  },
  computed: {
    skills() {
      return  this.categories.map(category => {
        category.skills = this.categoriesSkills.filter(skill => skill.category === category.id);
        return category;
      });
    }
  },
  methods: {
    getSkillsData() {
      const categories =  ServiceSkill.getAllCategories();
      const skills = ServiceSkill.getSkills();
      Promise.all([categories, skills])
        .then(res => {
          this.categories = res[0].data;
          this.categoriesSkills = res[1].data;
        });
    }
  },
  created() {
    this.getSkillsData();
    // this.skills = skills;
  }
});
