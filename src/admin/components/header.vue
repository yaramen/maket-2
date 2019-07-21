<template lang="pug">
    header.header
        .user-block
            .user-block__container
                img.user-block__image(src="~/images/content/user.jpg")
                .user-block__name Владимир Астаханов
                .user-block__title Панель администрирования
                a.user-block__logout(@click="logout") Выйти
        nav.menu
            ul.menu__list
                li.menu__item
                    router-link(class="menu__link" to="/" active-class='-active' exact) Обо мне
                li.menu__item
                    router-link(class="menu__link" to="/works" active-class='-active') Работы
                li.menu__item
                    router-link(class="menu__link" to="/reviews" active-class='-active') Отзывы
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    methods: {
      ...mapActions('user', ['logout'])
    }
  }
</script>
