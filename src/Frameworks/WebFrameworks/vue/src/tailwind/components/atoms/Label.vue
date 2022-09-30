<template>
  <label class="dark:text-white" :for="inputId">{{ name }}</label>
</template>

<script>
export default {
  name: "Label",
  props: ["name", "inputId"],
};
</script>
