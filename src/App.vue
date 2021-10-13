<template>
  <nav-bar></nav-bar>
  <div class="cover">
    <div class="spacer"></div>
    <div class="centered center-l">
      <search-bar
        @searchThisTerm="
          runAudit($event);
          getJobs();
        "
      ></search-bar>
    </div>
    <job-list :jobData="Jobs"></job-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import JobList from "./components/JobList.vue";
import "./assets/reset.css";
import "./assets/style.css";
import tempData from "../report/www.hyperionweb.dev/summary.json";
import axios, { AxiosInstance } from "axios";
import longPollAPI from "./services/longPollAPI";

export default defineComponent({
  name: "App",
  setup() {
    const Jobs = ref([]);
    const AuditData = ref([]);
    const batch = ref(false);
    const updateData = function ($event: any) {
      AuditData.value = $event;
    };
    console.log("Existing App Cookie: " + document.cookie);
    const getInternalJobs = function (result: any) {
      Jobs.value = result.data;
    };
    const getJobs = async function () {
      await axios.get("/api/init").then((res) => {
        Jobs.value = res.data;
      });
    };
    getJobs();

    return { AuditData, updateData, batch, Jobs, getJobs, getInternalJobs };
  },
  data() {
    return {
      td: tempData,
    };
  },
  components: {
    NavBar,
    SearchBar,
    JobList,
  },
  methods: {
    runAudit(search: string) {
      let AuditAPI = axios.create({});
      longPollAPI(AuditAPI, this.getJobs);
      AuditAPI({
        method: "POST",
        url: "/api/crawl",
        data: {
          site: `https://${search}`,
        },
      })
        .then((res) => {
          console.log(res);
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

.cover {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 0;
}

.cover > * {
  margin-top: auto;
  margin-bottom: auto;
}

.cover > :first-child:not(centered) {
  margin-top: 0;
}

.cover > :last-child:not(centered) {
  margin-bottom: 0;
}

.cover > centered {
  margin-top: auto;
  margin-bottom: auto;
}

.spacer {
  height: 8rem;
}
</style>
