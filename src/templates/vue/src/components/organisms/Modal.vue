<template>
  <b-modal :id="id" hide-footer>
    <template #modal-title>{{ title }}</template>
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  name: "Modal",
  props: ["id", "title"],
};
</script>

<style scoped>
#app {
  margin-bottom: "20px";
}
</style>
