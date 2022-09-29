<template>
  <button
    :id="id"
    :disabled="isDisabled"
    v-on:click="$emit('submit')"
    @click="$emit('onClick')"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["id", "name", "onClick", "submit", "isDisabled"],
};
</script>
