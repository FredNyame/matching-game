<template>
  <div id="app">
    <game 
      :loading="loading" 
      :message="message"
      :memoryCards="memoryCards"
      :moves="moves" 
      :timeRemaining="timeRemaining" 
      :gameover="gameover"
      :completed="completed"
      @select-card="flipCard"
      @restart="restart"
    />
  </div>
</template>

<script>
import Game from "./components/Game";

export default {
  name: 'App',
  components: {
    Game
  },
  data() {
    return {
      memoryCards: [],
      matchPairs: [],
      loading: true,
      moves: 0,
      show: true,
      countdown: null,
      timeRemaining: 50,
      gameover: false,
      completed: false,
      message: '',
      initialShownCard: 3
    }
  },
  /**
   * Handler for fetching & setting the data on page load
   */
  async created() {
    try {
      // Check localStorage first before making an api
      const cacheData = JSON.parse(localStorage.getItem('cards'));

      if(cacheData) {
        this.loading = false;
        this.memoryCards = this.randomizeData(cacheData);

        this.countdown = this.startCountdown()
      } else {
        const data = await this.getData();
        if (!data) {
          throw Error('Network response was not ok.');
        }
        
        this.loading = false;
        this.message = '';
        this.memoryCards = data;

        localStorage.setItem('cards', JSON.stringify(data));
        this.countdown = this.startCountdown()
      }
      this.initialCardShown();
    }
    catch(error) {
      this.message = error.message;
    }
  },
  methods: {
    /**
     * Handler for making ajax call to the given endpoint
     * Gets called on page load
     */
    async getData() {
      try {
        const response = await fetch(process.env.VUE_APP_SOURCE_URL)

        if (!response.ok) {
          throw Error('Page Not Found');
        }

        let data = await response.json();

        const refinedData = this.processData(data.data);

        return refinedData;
      } 
      catch(error) {
        this.message = error.message;
      }
    },
    /**
     * Handler for doubling our initial data
     * 
     * @param {Array} data - the response value from api call
     * @returns {Array} randomData - A randomize array base off the data passed
     */
    processData(data) { 
      let dataset = data.slice();
      let result = [];
      let sizeDouble = dataset.length * 2;
      let insectionIndex = 0;

      for(let i = 0; i < sizeDouble; i++) {
        insectionIndex = i;
        if (i >= dataset.length) {
          insectionIndex = i % dataset.length;

            result.push({
              value: dataset[insectionIndex],
              isFlipped: false,
              isMatch: false,
              isMismatch: false,
              isDisabled: false
            });

        } else {
          result.push({
            value: dataset[insectionIndex],
            isFlipped: false,
            isMatch: false,
            isMismatch: false,
            isDisabled: false
          })
        }
      }

      // randomize Data
      const randomData = this.randomizeData(result);
      return randomData;
    },
    /**
     * Handler for shuffling the processed Data
     * 
     * @param {Array} data - The values to be randomize
     * @returns {Array} memoryCards - A randomize array base off the data passed
     */
    randomizeData(data) {
      let memoryCards = data.slice();
      let cardsLength = memoryCards.length;
      
      for(let i = cardsLength - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * ( i + 1) );
        let temp = memoryCards[randomIndex];
        memoryCards[randomIndex] = memoryCards[i];
        memoryCards[i] = temp;
      }

      return memoryCards;
    },
    /**
     * Handler for showing the initial shown card
     * 
     */
    initialCardShown() {
      const firstCard = this.memoryCards[this.initialShownCard];
      firstCard.isFlipped = true;
      firstCard.isDisabled = true;
      this.matchPairs.push(firstCard)
    },
    /**
     * Handler for opening & checking match cards
     * 
     * @param {Number} index - The value of the card to open
     */
    flipCard(index) { // Handler for opening & checking match cards
      this.memoryCards[index].isFlipped = true;
      this.memoryCards[index].isDisabled = true;

      if (this.matchPairs.length < 2) {
        this.matchPairs.push(this.memoryCards[index]);
      }

      if (this.matchPairs.length == 2) {
          this.moves += 1;

          if (this.matchPairs[0].value === this.matchPairs[1].value) {
            this.match();
          } else {
            this.unmatch();
          }
      }
      this.checkCompleted();
    },
    /**
     * Handler the behavior of a match pairs.
     * 
     */
    match() {
      let self = this;
      self.matchPairs.forEach(card => {
        card.isMatch = true;
      });
      self.matchPairs = [];
    },
    /**
     * Handler the behavior of a mismatch pairs.
     * 
     */
    unmatch() {
      let self = this;
      self.matchPairs.forEach(card => {
        card.isMatch = false;
        card.isMismatch = true;
      });
      this.disable();

      setTimeout(function () {
        self.matchPairs.forEach(card => {
          card.isFlipped = false;
          card.isMismatch = false;
        });
        self.enable();
        self.matchPairs = [];
      }, 500);

    },
    /**
     * Disable the clickability of the cards.
     * 
     */
    disable() {
      this.memoryCards.forEach(card => {
        card.isDisabled = true
      });
    },
    /**
     * Enables the clickability of the cards.
     * 
     */
    enable() {
      this.memoryCards.forEach(card => {
        card.isDisabled = false
      });

      this.memoryCards.forEach(card => {
        if (card.isMatch) {
          card.isDisabled = true;
        }
      })
    },
    /**
     * Handler the runtime of the game.
     * 
     */
    startCountdown() {
      return setInterval(() => {
        this.timeRemaining--;
        if(this.timeRemaining === 0)
          this.gameOver();
      }, 1000);
    },
    /**
     * Handler the visibility of the game over modal.
     * 
     */
    gameOver() {
      clearInterval(this.countdown);
      this.gameover = true;
    },
    /**
     * Set the victory modal when all matches are found.
     * 
     */
    checkCompleted(){
      if(this.memoryCards.every(card => card.isMatch)) {
        clearInterval(this.countdown);
        this.completed = true;
      }
    },
    /**
     * Handler for game restart.
     * 
     */
    restart() {
      clearInterval(this.countdown);
      this.memoryCards.forEach(card => {
        card.isFlipped = false,
        card.isMatch = false,
        card.isMismatch = false,
        card.isDisabled = false
      })
      this.matchPairs = [],
      this.moves = 0,
      this.show = false
      this.timeRemaining = 50;
      this.completed = false;
      this.gameover = false;

      setTimeout(() => {
        this.countdown = this.startCountdown();
        this.memoryCards = this.randomizeData(this.memoryCards)
      }, 500)
    }
  }
}
</script>

<style lang="scss">
  .loader {
    position: absolute;
    border: 0.25rem solid var(--platinum);
    border-top: 0.25rem solid var(--amaranth-red); 
    border-bottom: 0.25rem solid var(--amaranth-red); 
    border-radius: 50%;
    width: 60px;
    height: 60px;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    animation: spin 2s linear infinite;
  }
</style>