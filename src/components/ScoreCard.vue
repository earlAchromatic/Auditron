<template>
  <div class="scorecard">
    <el-progress
      type="dashboard"
      :percentage="percentage"
      :color="colors"
    ></el-progress>
    <span>{{ scoreTitle }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElProgress } from "element-plus";

export default defineComponent({
  setup() {
    const colors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ];
    return { colors };
  },
  components: {
    ElProgress,
  },
  props: {
    percentage: Number,
    scoreTitle: String,
  },
});
</script>

<style scoped>
.scorecard {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.scorecard span {
  white-space: nowrap;
}
</style>
