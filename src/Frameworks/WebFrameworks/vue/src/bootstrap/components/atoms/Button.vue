<template>
  <b-button :id="id" :size="size" :variant="color" :disabled="isDisabled" v-on:click="$emit('submit')" @click="$emit('onClick')">{{ name }}</b-button>
</template>

<script>
export default {
  name: "Button",
  props: ["id", "size", "name", "color", "onClick", "submit", "isDisabled"],
};
</script>
