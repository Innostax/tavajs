<template>
  <div>
    <b-button :variant="color" v-on:click="onClick">{{ name }}</b-button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["name", "color", "onClick"],
};
</script>
