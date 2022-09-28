<template>
    <label :for="inputId">{{ name }}</label>
</template>

<script>
export default {
  name: "Label",
  props: ["name","inputId"],
};
</script>
