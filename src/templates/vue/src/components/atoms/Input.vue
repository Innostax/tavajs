<template>
  <div>
    <input :type="type" :placeholder="placeholder" :value="value"  @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["type", "placeholder", "value"],
};
</script>
