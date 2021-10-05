<template>
  <el-table :data="data" style="width: 100%" height="50rem">
    <el-table-column fixed prop="url" label="url" width="300" />
    <el-table-column prop="detail.performance" label="performance" />
    <el-table-column prop="detail.accessibility" label="accessibility" />
    <el-table-column prop="detail.best-practices" label="best-practices" />
    <el-table-column prop="detail.seo" label="seo" />
  </el-table>
</template>

<script>
import { ElTable, ElTableColumn } from "element-plus";
export default {
  props: ["data"],
  components: {
    ElTable,
    ElTableColumn,
  },
};
</script>

<style scoped></style>
