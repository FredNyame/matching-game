<template>
    <div class="app__header">
        <h1>Attempts: {{moves}}</h1>
        <div v-if="time">
            <time>Time: {{time}}</time>
        </div>
        <div>
            <button @click="resetGame" aria-label="restart game" title="Restart Game">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameBoardHeader',
    props: {
        moves: {
            type: Number
        },
        time: {
            type: Number
        }
    },
    methods: {
        resetGame() {
            this.$emit('restart:game');
        }
    }
}
</script>

<style lang="scss" scoped>
    .app__header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--davys-grey-lighter);
        button {
            cursor: pointer;
            background: transparent;
            border: 0px;
        }
    }
    
    h1 {
        font-size: 1.125rem;
        @media screen and (min-width: 500px) {
            font-size: 1.5rem;
        }
    }

    time {
        font-weight: bold;
        font-size: 1.125rem;
        margin-left: auto;
    }

    button {
        margin-left: auto;
    }

    svg {
        transform: rotate(-180deg);
        &:hover {
            transform: rotate(180deg);
            transition: transform 0.3s ease-in-out;
        }
    }

    .h-5 {
        height: 1.25rem;
    }

    .w-5 {
        width: 1.25rem;
    }
</style>