<template>
  <nav-bar></nav-bar>
  <div class="center-l">
    <search-bar @searchReturn="updateData($event)"></search-bar>
    <the-platform :data="AuditData"></the-platform>
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

export default defineComponent({
  name: "App",
  setup() {
    const AuditData = ref([]);
    const updateData = function ($event: any) {
      AuditData.value = $event;
    };
    return { AuditData, updateData };
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
});
</script>

<style>
.center-l {
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8rem;
  max-width: 60%;
}
</style>
