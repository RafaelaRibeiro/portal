<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900"
  >
    <div class="flex flex-col items-center space-x-2">
      <v-progress-circular
        indeterminate
        size="70"
        :width="7"
        color="#f3faff"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
.custom-loader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #2271a1 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, #2271a1);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}

@keyframes s3 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
