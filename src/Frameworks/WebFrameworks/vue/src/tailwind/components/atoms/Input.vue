<template>
  <input type="type" :placeholder="placeholder" :value="modelValue" @input="updateValue" />
</template>

<script>
export default {
  name: 'Input',
  props: ['modelValue', 'type', 'placeholder'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
