<template lang="pug">
    .works-controller
        workForm(v-if="isAdd || isEdit" v-on:cancel="cancel" :add="isAdd" :edit="isEdit" :work="formWorkData" :key="formWorkData.id")
        .card-list
            .card-list__col
                button.card-list__add(@click="openFormAdd")
                    .card-list__icon +
                    .card-list__text Добавить<br> работу
            workCard(v-for="work in works" v-on:edit="editWork" :work="work" :key="work.id")
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import workForm from '../work-form';
  import workCard from '../work-card';

  export default {
    components: {
      workForm,
      workCard
    },
    data() {
      return {
        isAdd: false,
        isEdit: false,
        workData: {
          title: '',
          techs: '',
          photo: '',
          link: '',
          description: ''
        },
        editingWorkId: 0
      }
    },
    computed: {
      ...mapState('works', {
        works: state => state.works
      }),
      formWorkData() {
        let rst = {...this.workData};
        if(this.isEdit) {
          rst = {...this.works.find(el =>
              el.id === this.editingWorkId
          )};
        }
        return rst;
      }
    },
    methods: {
      ...mapActions('works', ['getAllWorks']),
      openFormAdd() {
        this.isAdd = true;
        this.isEdit = false;
      },
      cancel() {
        this.isAdd = false;
        this.isEdit = false;
      },
      editWork(id) {
        this.isEdit = true;
        this.isAdd = false;
        this.editingWorkId = id;
      }
    },
    created() {
      this.getAllWorks();
    }
  }
</script>
