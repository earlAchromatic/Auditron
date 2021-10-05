<template>
  <div id="scoreboard">
    <h2 v-if="data[0]">{{ data[0].url }}</h2>
    <div>
      <score-card
        :percentage="isNaNCat(avgPerf)"
        :scoreTitle="'performance'"
      ></score-card>
      <score-card
        :percentage="isNaNCat(avgAcc)"
        :scoreTitle="'accessibility'"
      ></score-card>
      <score-card
        :percentage="isNaNCat(avgBP)"
        :scoreTitle="'best practices'"
      ></score-card>
      <score-card
        :percentage="isNaNCat(avgSeo)"
        :scoreTitle="'seo'"
      ></score-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ScoreCard from "./ScoreCard.vue";
import { data } from "../data.type";

export default defineComponent({
  setup(props) {
    const len = computed((): number => props.data.length);

    const sumPerf = computed((): number =>
      props.data.reduce((a: number, v: data) => {
        if (v.detail) {
          return a + v.detail["performance"];
        } else {
          return a + 0;
        }
      }, 0)
    );

    const sumAcc = computed((): number =>
      props.data.reduce((a: number, v: data) => {
        if (v.detail) {
          return a + v.detail["accessibility"];
        } else {
          return a + 0;
        }
      }, 0)
    );

    const sumBP = computed((): number =>
      props.data.reduce((a: number, v: data) => {
        if (v.detail) {
          return a + v.detail["best-practices"];
        } else {
          return a + 0;
        }
      }, 0)
    );

    const sumSeo = computed((): number =>
      props.data.reduce((a: number, v: data) => {
        if (v.detail) {
          return a + v.detail["seo"];
        } else {
          return a + 0;
        }
      }, 0)
    );

    const calcAvg = function (category: any): number {
      return category.value / len.value;
    };

    const avgPerf = computed(() => calcAvg(sumPerf));
    const avgAcc = computed(() => calcAvg(sumAcc));
    const avgBP = computed(() => calcAvg(sumBP));
    const avgSeo = computed(() => calcAvg(sumSeo));
    const avg = computed(
      () => (avgPerf.value + avgAcc.value + avgBP.value + avgSeo.value) / 4
    );

    const isNaNCat = (cat: number) => {
      if (!isNaN(cat)) {
        return Math.round(cat * 100);
      } else return 0;
    };

    return { avg, avgPerf, avgAcc, avgBP, avgSeo, isNaNCat };
  },
  props: ["data"],
  components: {
    ScoreCard,
  },
});
</script>

<style scoped>
#scoreboard {
  display: flex;
  flex-direction: column;
}
#scoreboard > div {
  display: flex;
  justify-content: space-around;
}
</style>
