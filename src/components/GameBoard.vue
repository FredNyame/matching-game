<template>
  <div class="grid">
    <template v-for="(card, index) in cards">
      <game-board-card :card="card" :position="index" :key="`grid-${index}`" @open:card="flipCard"></game-board-card>
    </template>
  </div>
</template>

<script>
import GameBoardCard from "./GameBoardCard.vue";

export default {
  name: 'GameBoard',
  props: {
    cards : {
      type: Array
    }
  },
  components: {
    GameBoardCard
  },
  methods: {
    flipCard(data) {
      this.$emit('select-card', data)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 0.25rem;
  margin: 1rem auto;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
