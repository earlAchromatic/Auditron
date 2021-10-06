<template>
  <main>
    <score-board :data="data" :batch="batch"></score-board>
    <button @click="showDetail = !showDetail">See Detail</button>
    <template v-if="showDetail">
      <!-- <the-table :data="data"></the-table> -->
      <the-table :data="data"></the-table>
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScoreBoard from "./ScoreBoard.vue";
import TheTable from "./TheTable.vue";

export default defineComponent({
  data() {
    return {
      showDetail: false,
    };
  },
  props: ["data", "batch"],
  components: {
    ScoreBoard,
    TheTable,
  },
});
</script>

<style scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-2);
  padding: 5rem;
  margin-top: 10rem;
}
button {
  background: var(--color-2);
}
</style>
