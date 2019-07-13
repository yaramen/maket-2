<template lang="pug">
    div
        include components/section/header.pug
        main
            sectoin.content
                .content__header
                    .content__title Блок "Обо мне"
                    .content__add-group
                        button.btn.-group Добавить группу
                .content__body
                    include components/section/skills-controller.pug
                    include components/section/works-controller.pug
                    include components/section/works-controller.pug
</template>
