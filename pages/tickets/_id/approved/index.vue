<template>
  <div
    class="flex flex-col mt-3 items-center bg-white justify-center min-h-screen md:min-h-[79vh]"
  >
    <img
      src="~/assets/aprovado.jpg"
      alt="Imagem de Chamado Aprovado"
      class="w-64 h-64 mb-4 rounded-full"
    />
    <h1 class="text-4xl font-bold mb-4 text-red-900">Chamado Aprovado!</h1>
    <p class="text-lg text-center px-4 md:px-8">
      {{ message }} - {{ $route.params.id }}
    </p>
    <!-- Outros elementos da tela, se necessário -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticket: {},
    }
  },

  async mounted() {
    await this.initialize()
  },

  computed: {
    message() {
      if (this.ticket.situation_id === 4) {
        return 'Agradecemos pela aprovação e daremos continuidade ao seu chamado.'
      } else if (this.ticket.situation_id === 3) {
        return 'Agradecemos pela validação do chamado.'
      } else {
        return 'Esse chamado não requer aprovação.'
      }
    },
  },

  methods: {
    async initialize() {
      await this.getTickets()
      await this.aproveTicket()
    },

    async getTickets() {
      const ticket = await this.$axios.get(
        `/tickets/${this.$route.params.id}/list`
      )
      this.ticket = ticket.data // Assume que os dados do ticket estão na propriedade "data"
    },

    async aproveTicket() {
      await this.$axios.put(`/tickets/${this.$route.params.id}/approve`)
    },
  },
}
</script>

<style></style>
