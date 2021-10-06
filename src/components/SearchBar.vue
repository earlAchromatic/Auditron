<template>
  <div id="search">
    <div>
      <div class="cap cap-left">
        <span>https://</span>
      </div>
      <input
        type="text"
        v-model="searchTerm"
        @keyup.enter="sendSearchTerm(searchTerm)"
      />
      <div class="cap cap-right">
        <button @click="sendSearchTerm(searchTerm)">audit!</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchTerm: "www.",
    };
  },
  methods: {
    sendSearchTerm(searchTerm: string) {
      this.$emit("searchThisTerm", searchTerm);
      const searchbar: HTMLElement = this.$el.querySelector("#search div");
      console.log("posted");
      searchbar.classList.add("pulsar");
      setTimeout(() => {
        searchbar.classList.remove("pulsar");
      }, 500);
    },
  },
});
</script>

<style scoped>
#search {
  max-width: var(--measure);
  padding: 2rem;
  margin-right: auto;
  margin-left: auto;
  height: 30vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}
#search > * {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.226);
  border-radius: var(--radius);
  transition: box-shadow 0.1s ease-in-out;
}
#search > *:hover {
  box-shadow: var(--shadow-2);
  transition: box-shadow 0.1s ease-in-out;
}
.pulsar {
  animation: pulse 2s ease-in-out 1;
}

input[type="text"] {
  width: 100%;
  border: none;
}

input[type="text"]:focus,
input[type="text"]:active {
  outline: none;
}
.cap {
  min-width: 8rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cap span {
  color: lightslategray;
}

.cap-right {
  background: powderblue;
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
}
.cap-left {
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  justify-content: right;
}

button {
  cursor: pointer;

  width: 100%;
  height: 100%;
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
}
button:hover {
  background: mediumturquoise;
}
button:active {
  transform: scale(0.95);
}

@keyframes pulse {
  0% {
    box-shadow: var(--shadow-2), 0 0 0 0 rgba(21, 255, 0, 0.7);
  }

  70% {
    box-shadow: var(--shadow-2), 0 0 0 25px rgba(21, 255, 0, 0);
  }

  100% {
    box-shadow: var(--shadow-2), 0 0 0 0 rgba(21, 255, 0, 0);
  }
}
</style>
