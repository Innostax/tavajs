<template>
  <b-modal :id="id">
    <template #modal-header>
      <h5 class="m-0">{{ title }}</h5>
      <button class="btn-close fs-7" @click="$bvModal.hide(id)"></button>
    </template>
    <slot name="body" />
    <template #modal-footer>
      <slot name="footer" />
    </template>
  </b-modal>
</template>
  
<script>
export default {
  name: "Modal",
  props: ["id", "title"],
};
</script>
