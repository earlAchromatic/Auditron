<template>
  <div class="job-list reel">
    <job-panel v-for="(job, i) in jobData" :key="i" :job="job"></job-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobPanel from "./JobPanel.vue";

export default defineComponent({
  setup() {
    return {};
  },
  name: "JobList",
  props: {
    jobData: Array,
  },
  components: {
    JobPanel,
  },
});
</script>

<style scoped>
.job-list {
  padding: 1rem;
  width: 100%;
  height: 15rem;
  background: rgba(128, 128, 128, 0.397);
}
.reel {
  display: flex;
  height: auto;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: #fff #000;
}

.reel::-webkit-scrollbar {
  height: 1rem;
}

.reel::-webkit-scrollbar-track {
  background-color: #000;
}

.reel::-webkit-scrollbar-thumb {
  background-color: #000;
  background-image: linear-gradient(
    #000 0,
    #000 0.25rem,
    #fff 0.25rem,
    #fff 0.75rem,
    #000 0.75rem
  );
}

.reel > * {
  flex: 0 0 auto;
}

.reel > img {
  height: 100%;
  flex-basis: auto;
  width: auto;
}

.reel > * + * {
  margin-left: 1rem;
}

.reel.overflowing {
  padding-bottom: 1rem;
}
</style>
