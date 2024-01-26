<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <div class="flex justify-center mt-5">
        <v-icon size="100" color="red">{{ iconName }}</v-icon>
      </div>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <div class="flex justify-center">
          <slot></slot>
        </div>
      </v-card-text>

      <div class="flex justify-center mb-5">
        <button
          class="bg-green-800 px-5 py-2 mr-4 text-white rounded"
          @click="$emit('confirm', index)"
        >
          {{ confirmText }}
        </button>
        <button
          class="bg-red-800 px-5 text-white rounded"
          @click="$emit('cancel')"
        >
          {{ cancelText }}
        </button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    confirmText: String,
    cancelText: String,
    dialog: Boolean,
    iconName: String,
    index: Number,
  },
}
</script>
