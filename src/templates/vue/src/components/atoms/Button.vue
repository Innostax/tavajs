<template>
  <div>
    <b-button :id="id" :class="className" :variant="color" v-on:click="$emit('submit')" @click="$emit('onClick')">{{ name }}</b-button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["id", "className", "name", "color", "onClick", "submit"],
};
</script>
