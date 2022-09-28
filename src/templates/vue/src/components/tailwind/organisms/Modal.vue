<template>
  <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
   <div
      ref="modal-backdrop" v-show="show"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
      <transition
  enter-active-class="transition ease-out duration-300 transform "
  enter-from-class="opacity-0 translate-y-0 scale-95"
  enter-to-class="opacity-100 translate-y-10 scale-100"
  leave-active-class="ease-in duration-200"
  leave-from-class="opacity-100 translate-y-10 scale-100"
  leave-to-class="opacity-0 translate-y-10 translate-y-10 scale-95"
>
  
<div
 id="modal" v-show="show"
 class="bg-white fixed shadow-lg overflow-hidden  rounded-2xl flex flex-col  justify-between w-2/6"
>
  <!-- Modal Header -->
 <header
id="modal-header"
class=" flex border-white"
>
<slot name="header"></slot>
</header> 

   <!-- Modal Body  -->
   <section id="modal-body" class="px-4 py-6">
<slot name="body"></slot>
</section>

   <!-- Modal Footer  -->
   <footer id="modal-footer" class="ml-auto  border-t-2 border-white">
<slot name="footer"></slot>
</footer>

 </div></transition></div></div></transition></template>    
<script>
  // import { ref, watch } from 'vue';

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
 export default {
   name: "Modal",
   methods: {},
   props,
};
   
 </script> 
 