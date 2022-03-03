<template>
    <button class="grid__control" :class="cardClasses" @click="flipCard" :disabled="card.isDisabled" aria-label="game card">
        <div class="grid__control-back" v-if="!card.isFlipped"></div>
        <div class="grid__control-front" v-else>
            {{card.value}}
        </div>
    </button>
</template>

<script>
export default {
    name: 'GameBoardCard',
    props: {
        position: {
            type: Number
        },
        card: {
            type: Object
        }
    },
    computed: {
        cardClasses() {
            return {
                'open': this.card.isFlipped,
                'match': this.card.isMatch,
                'mismatch': this.card.isMismatch
            }
        }
    },
    methods: {
        flipCard() {
            this.$emit('open:card', this.position)
        }
    }
}
</script>

<style lang="scss" scoped>
.grid__control {
    position: relative;
    width: 80px;
    height: 80px;
    background-color: var(--davys-grey);
    border: 0px;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;

    @media screen and (min-width: 345px) {
        width: 100px;
        height: 100px;
    }

    @media screen and (min-width: 500px) {
        width: 150px;
        height: 150px;
    }

    &:hover,&:active, &:focus {
        transform: scale(0.985);
        transition: transform 0s ease-in-out;
    }

    &.open {
        animation: pinch 0.5s ease-in-out forwards;
    }

    &:disabled {
        pointer-events: none;
    }

    &.match {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
        .grid__control-front {
            background-color: var(--blue-green-color-wheel);
            color: var(--white);
        } 
    }

    &.mismatch {
        animation: zoomIn 0.5s;
        .grid__control-front {
            background-color: var(--amaranth-red);
            color: var(--white);
        }
    }

    .grid__control-back {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: var(--davys-grey);
    }

    .grid__control-front {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        font-size: 2rem;
        background-color: var(--white);
        z-index: 1;
    }
}
</style>