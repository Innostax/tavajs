<template>
  <div>
    <input type="type" :placeholder="placeholder" v-model="value" />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["type", "placeholder", "value"],
};
</script>
