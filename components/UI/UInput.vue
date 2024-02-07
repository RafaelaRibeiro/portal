<template>
  <input
    :type="inputType"
    class="rounded px-4 py-2 text-base block w-full text-gray-700 leading-tight bg-white border border-solid border-gray-500 focus:border-2 focus:outline-none focus:border-colorButton hover:border-colorButton"
    :value="modelValue"
    @input="$emit('input', $event.target.value)"
    v-if="maskOptions"
    v-mask="maskOptions"
  />
  <input
    :type="inputType"
    class="rounded px-4 py-2 text-base block w-full text-gray-700 leading-tight bg-white border border-solid border-gray-500 focus:border-2 focus:outline-none focus:border-colorButton hover:border-colorButton"
    :value="modelValue"
    @input="$emit('input', $event.target.value)"
    v-else
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number, Object, Array],
      default: '', // Certifique-se de que este valor inicial não seja uma string vazia se estiver usando máscara
    },
    inputType: {
      type: String,
      default: 'text', // Padrão para o tipo de input
    },
    maskOptions: {
      type: [String, Array, Object],
      default: null,
    },
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped>
/* Adicione estilos específicos do componente aqui, se necessário */
</style>
