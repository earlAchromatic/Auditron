<template>
  <h2 v-if="data[0]">{{ data[0].url }}</h2>
  <div class="modal-cont" id="scoreboard">
    <div v-if="batch" class="modal">
      <span>Auditing Website...</span>
    </div>

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
  props: ["data", "batch"],
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

.modal-cont {
  position: relative;
}
.modal {
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal > span {
  animation: waitpulse infinite alternate-reverse ease-in-out 3s;
}

@keyframes waitpulse {
  20% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 1);
  }

  70% {
    text-shadow: 0 0 50px rgba(255, 0, 0, 1);
  }

  100% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 1);
  }
}
</style>
