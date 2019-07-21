<template lang="pug">
    section.auth
        form.auth__form
            h2.auth__title Авторизация
            form.auth__body(@submit.prevent="doAuth")
                .auth__field-group
                    label.auth__label(for="login") Логин
                    .auth__entry
                        .auth__field-icon
                        input.auth__field.-login(type="text" id="login"  v-model="user.name" placeholder="Введите логин")
                .auth__field-group
                    label.auth__label(for="password") Пароль
                    .auth__entry
                        .auth__field-icon
                        input.auth__field.-password(type="password" id="password"  v-model="user.password" placeholder="Введите пароль")
                button.auth__send(type="submit") Отправить
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'auth',
    data() {
      return {
        user: {
          name: '',
          password: '',
        }
      }
    },
    methods: {
      ...mapActions('user', ['auth']),
      doAuth() {
        this.auth(this.user);
      }
    }
  }
</script>
