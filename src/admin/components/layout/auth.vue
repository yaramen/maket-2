<template lang="pug">
    section.auth
        form.auth__form
            h2.auth__title Авторизация
            form.auth__body(@submit.prevent="doAuth")
                .auth__field-group(:class="{'-no-valid': touch.name && !isValidName}")
                    label.auth__label(for="login") Логин
                    .auth__entry
                        .auth__field-icon
                        input.auth__field.-login(type="text" id="login"  v-model="user.name" @input="touch.name=true" placeholder="Введите логин")
                        .auth__error {{validationMessage.name}}
                .auth__field-group(:class="{'-no-valid': touch.password && !isValidPassword}")
                    label.auth__label(for="password") Пароль
                    .auth__entry
                        .auth__field-icon
                        input.auth__field.-password(type="password" id="password"  v-model="user.password" @input="touch.password=true" placeholder="Введите пароль")
                        .auth__error {{validationMessage.password}}
                button.auth__send(type="submit" :disabled="!isValidName || !isValidPassword") Отправить
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
        },
        validationMessage: {
          name: 'Слишком короткий логин',
          password:  'Слишком короткий пароль'
        },
        touch: {
          name: false,
          password: false
        }
      }
    },
    computed: {
      isValidName() {
        return this.user.name.length >= 4
      },
      isValidPassword() {
        return this.user.password.length >= 4
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
