<template>
    <app-modal :show="show">
        <h1 class="modal__header">GAME OVER</h1>
        <button class="modal__button--small" @click="restartGame">Play Again</button>
    </app-modal>
</template>

<script>
export default {
    name: 'GameOverModal',
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