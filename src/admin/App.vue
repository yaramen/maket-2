<template lang="pug">
    div
        include components/section/auth.pug
        include components/section/header.pug
        main
            section.content
                .content__header
                    .content__title Блок "Обо мне"
                    .content__add-group
                        button.content__add
                            span.content__add-plus +
                            span.content__add-text Добавить группу
                .content__body
                    include components/section/skills-controller.pug
                    include components/section/works-controller.pug
                    include components/section/review-controller.pug
</template>

<style lang="postcss">
    @import "style/main.pcss";
</style>
