<template lang="pug">
    .tooltip(:class="`${type} ${isShow ? 'show' : ''}`")
        .tooltip__message {{message}}
        button.tooltip__close(@click="closeTooltip")
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapState({
        message: state => state.tooltip.message,
        type: state => state.tooltip.type,
        isShow: state => state.tooltip.isShow,
      })
    },
    methods: {
      ...mapActions(['closeTooltip'])
    }
  }
</script>

<style lang="postcss">
    .tooltip {
        position: fixed;
        bottom: 0;
        left: 50%;
        display: flex;
        justify-content: space-between;
        padding: 25px 30px;
        z-index: 100;
        min-width: 340px;
        transform: translate(-50%, 100%);
        transition: transform 0.4s ease-in;

        &__message {
            color: #fff;
        }

        &__close {
            position: relative;
            width: 22px;
            height: 22px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            &:before, &:after {
                content: '';
                position: absolute;
                top: 9px;
                left: 0;
                display: block;
                width: 100%;
                height: 4px;
                background-color: #fff;
            }

            &:before {
                transform: rotate(45deg);
            }

            &:after {
                transform: rotate(-45deg);
            }
        }

        &.success {
            background-color: #4bb132;
        }

        &.danger {
            background-color: #b13334;
        }

        &.warning {
            background-color: #b28333;
        }

        &.show{
            transform: translate(-50%, 0);
        }
    }
</style>
