<template>
  <div>
    <b-button id="show-btn" class="mt-3" :variant="color" v-on:click="$emit('submit')" @click="$emit('onClick')">{{ name }}</b-button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["name", "color", "onClick", "submit"],
};
</script>