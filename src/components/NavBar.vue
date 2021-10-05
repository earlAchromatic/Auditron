<template>
  <nav>
    <h1>Auditor</h1>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style>
nav {
  position: fixed;
  top: 0;
  background: var(--primary);
  box-shadow: var(--shadow-2);
  box-sizing: content-box;
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 8rem;
  z-index: 200;
}
</style>
