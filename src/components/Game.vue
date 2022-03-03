<template>
    <div>
        <div class="relative">
            <app-notification :message="message" />
            
            <game-board-header 
            :moves="moves" 
            @restart:game="restartGame" 
            :time="timeRemaining" 
            />

            <app-loader v-if="loading"/>

            <game-board 
            v-else 
            :cards="memoryCards" 
            @select-card="flipCard" 
            />
        </div>

        <victory-modal 
        :show="completed" 
        @restart:game="restartGame" 
        />

        <game-over-modal 
        :show="gameover" 
        @restart:game="restartGame" 
        />
    </div>
</template>

<script>
import AppNotification from './AppNotification.vue';
import GameBoardHeader from "./GameBoardHeader.vue";
import GameBoard from "./GameBoard.vue";
import VictoryModal from "./VictoryModal.vue";
import GameOverModal from "./GameOverModal.vue";

export default {
    name: 'Game',
    components: {
        GameBoardHeader,
        GameBoard,
        VictoryModal,
        GameOverModal,
        AppNotification
    },
    props:{
        loading: {
            type: Boolean
        },
        memoryCards : {
            type: Array
        },
        moves: {
            type: Number
        },
        timeRemaining: {
            type: Number
        },
        completed: {
            type: Boolean
        },
        gameover: {
            type: Boolean
        },
        message: {
            type: String
        },
    },
    methods: {
        flipCard(data){
            this.$emit('select-card', data)
        },
        restartGame() {
            this.$emit('restart');
        }
    }
}
</script>

<style lang="scss">
    .relative {
        position: relative;
    }
</style>