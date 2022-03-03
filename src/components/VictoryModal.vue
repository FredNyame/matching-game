<template>
    <app-modal :show="show">
        <h1 class="modal__header">VICTORY</h1>
        <button class="modal__button--small" @click="restartGame">Click to Restart</button>
    </app-modal>
</template>

<script>
export default {
    name: 'VictoryModal',
    props: {
        show: Boolean
    },
    methods: {
        restartGame() {
            this.$emit('restart:game');
        }
    }
}
</script>