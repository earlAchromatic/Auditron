<template>
  <div
    class="job-panel"
    :class="job.status === 'Running' ? 'waiting' : 'complete'"
  >
    <h3 v-text="job.subsite"></h3>
    <hr />
    <span>Type: {{ job.type }}</span>
    <br />
    <span>Status: {{ job.status }}</span>
    <br />
    <template v-if="job.status === 'Succeeded'">
      <span>Result: {{ job.resultUrl }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "JobPanel",
  props: ["job"],
});
</script>

<style scoped>
.job-panel {
  box-shadow: var(--shadow-1);
  padding: 1rem;
}
.waiting {
  box-shadow: var(--shadow-1);
  animation: waitpulse infinite alternate-reverse ease-in-out 3s;
}
.job-panel.complete {
  box-shadow: var(--shadow-1), 1px 1px 10px greenyellow;
}
@keyframes waitpulse {
  20% {
    box-shadow: 0 0 10px rgba(255, 0, 0, 1);
  }

  70% {
    box-shadow: 0 0 50px rgba(255, 0, 0, 1);
  }

  100% {
    box-shadow: 0 0 10px rgba(255, 0, 0, 1);
  }
}
</style>
