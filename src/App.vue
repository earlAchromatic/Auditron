<template>
  <nav-bar></nav-bar>
  <div class="center-l">
    <search-bar @searchThisTerm="runAudit($event)"></search-bar>
    <button @click="runBatch()"></button>
    <the-platform :data="AuditData" :batch="batch"></the-platform>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import ThePlatform from "./components/ThePlatform.vue";
import "./assets/reset.css";
import "./assets/style.css";
import tempData from "../report/www.hyperionweb.dev/summary.json";
import axios, { AxiosInstance } from "axios";
import longPollAPI from "./services/longPollAPI";

export default defineComponent({
  name: "App",
  setup() {
    const AuditData = ref([]);
    const batch = ref(false);
    const updateData = function ($event: any) {
      AuditData.value = $event;
    };
    return { AuditData, updateData, batch };
  },
  data() {
    return {
      td: tempData,
    };
  },
  components: {
    NavBar,
    SearchBar,
    ThePlatform,
  },
  methods: {
    runAudit(search: string) {
      let AuditAPI = axios.create({});
      longPollAPI(AuditAPI);
      AuditAPI({
        method: "POST",
        url: "/api/crawl",
        data: {
          site: `https://${search}`,
        },
      })
        .then((res) => {
          this.updateData(res.data.result.tableTransform);

          this.runBatch(AuditAPI, res.data.result.tableTransform);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
        });
    },
    runBatch(axiosInstance: AxiosInstance, batchInput: string[]) {
      this.batch = true;
      axiosInstance({
        method: "POST",
        url: "/api/batch",
        data: {
          root: batchInput[0],
          batchInput: batchInput,
        },
      }).then((res) => {
        this.batch = false;
        console.log(res);
        this.updateData(res.data);
      });
    },
  },
});
</script>

<style>
.center-l {
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8rem;
  max-width: 80%;
}
</style>
