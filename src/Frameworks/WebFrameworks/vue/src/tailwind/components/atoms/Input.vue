<template>
    <input :type="type" :placeholder="placeholder" :value="value"  @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: "Input",
  props: ["type", "placeholder", "value"],
};
</script>
