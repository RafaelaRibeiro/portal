<template>
  <div
    class="mx-4 md:mx-10 my-5 pb-4 grid gap-3 md:grid-cols-5 min-h-screen md:min-h-[79vh]"
  >
    <div class="md:col-span-4 bg-white p-4 max-h-[79vh] overflow-y-auto">
      <div class="flex items-center justify-between">
        <h1 class="headline font-weight-light">
          <i>
            <v-icon size="30" class="px-3">mdi-ticket-confirmation</v-icon>
            #{{ ticket.id }} - {{ ticket.subject }}
          </i>
        </h1>
        <div>
          <v-btn
            class="ma-2 white--text"
            color="#004011"
            @click="approveTicket"
            v-show="btnApproved"
          >
            <span>Aprovar</span></v-btn
          >
          <v-btn
            class="ma-2 white--text"
            color="#dc3545"
            @click="disapproveTicket"
            v-show="btnApproved"
          >
            <span>Recusar</span></v-btn
          >
          <v-btn
            class="ma-2 white--text"
            color="primary"
            @click="showEditor = true"
            v-show="btnReply"
          >
            <v-icon left> mdi-reply </v-icon> <span>Responder</span></v-btn
          >
          <v-btn
            v-show="btnClose"
            class="ma-2 white--text"
            color="#6c757d"
            @click="closeTicket"
          >
            <span>Encerrar chamado</span></v-btn
          >
        </div>
      </div>

      <div v-show="showEditor" class="my-3">
        <no-ssr>
          <vue-editor
            class="mx-4"
            placeholder="Escreva aqui..."
            v-model="reply.content"
          ></vue-editor>
        </no-ssr>

        <div class="grid grid-cols-3 m-2">
          <div class="col-span-2">
            <v-file-input
              v-model="files"
              placeholder="Anexe seus documentos"
              label="Anexos"
              multiple
              prepend-icon="mdi-paperclip"
              outlined
              counter
              dense
              show-size
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </div>

          <div class="justify-self-end">
            <v-btn @click="showEditor = false">Cancelar</v-btn>
            <v-btn
              @click="saveReply"
              color="primary"
              :disabled="!isContentValid"
            >
              <v-icon left> mdi-send </v-icon> Enviar</v-btn
            >
          </div>
        </div>
      </div>
      <div
        v-for="c in content"
        :key="c.id"
        class="rounded border border-solid border-gray-500 p-4 m-4 elevation-5"
        :class="{
          'bg-blue-100': c.user.profile === 'O',
          'bg-white': c.type !== 'A',
        }"
      >
        <c-ticket-main-id-item :content="c" @edit="editChild" />
      </div>
    </div>
    <div class="col-span-1 bg-white">
      <c-ticket-info :ticket="ticket" :situation="situation"></c-ticket-info>
    </div>
  </div>
</template>

<script>
import CTicketMainIdItem from './CTicketMainIdItem.vue'
import CTicketInfo from './CTicketInfo.vue'
import ticketsService from '~/services/ticketsService'

export default {
  components: { CTicketMainIdItem, CTicketInfo },
  data() {
    return {
      ticket: {},
      situation: {},
      showEditor: false,
      files: [],
      reply: {},
      content: [],
      edit: false,
      ticket_content_id: null,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },
  mounted() {
    this.getTicketById()
  },
  computed: {
    btnReply() {
      return (
        this.ticket.situation_id === 1 ||
        this.ticket.situation_id === 5 ||
        this.ticket.situation_id === 7 ||
        this.ticket.situation_id === 8
      )
    },
    btnApproved() {
      return this.ticket.situation_id === 3 || this.ticket.situation_id === 4
    },
    btnClose() {
      return this.ticket.situation_id !== 2 && this.ticket.situation_id !== 6
    },

    isContentValid() {
      const isValid = this.rules.required(this.reply.content) === true

      return isValid
    },
  },
  methods: {
    async getTicketById() {
      try {
        const ticket = await ticketsService.findOne(`${this.$route.params.id}`)
        this.ticket = ticket.ticket
        this.content = ticket.content
        this.situation = ticket.ticket.situation
      } catch (error) {
        console.error('An error occurred while fetching users:', error)
      }
    },

    async saveReply() {
      try {
        const response = await this.$axios.$post(
          `/tickets/${this.$route.params.id}/reply`,
          {
            content: this.reply.content,
            user_id: this.$auth.user.id,
            type: 'R',
          }
        )

        console.log(response)

        this.ticket_content_id = response.id
        await this.sendFile()
        this.showEditor = false
        this.reply.content = null
        this.getTicketById()
      } catch (error) {
        console.error('An error occurred while fetching reply:', error)
      }
    },

    async sendFile() {
      if (!this.files.length) {
        return
      }

      const formData = new FormData()
      for (const file of this.files) {
        formData.append('files', file)
      }

      this.snackbar = {
        show: true,
        text: 'Enviando arquivo...',
        color: 'info',
      }

      this.isUploading = true

      try {
        await ticketsService.uploadFile(this.ticket_content_id, formData)
        this.files = []
      } catch (error) {
        console.error('Falha ao enviar arquivo:', error)
        this.snackbar = {
          show: true,
          text: 'Erro ao enviar arquivo.',
          color: 'error',
        }
      } finally {
        this.isUploading = false
      }
    },
    editChild(edit) {
      this.edit = edit
    },
    async closeTicket() {
      try {
        await ticketsService.update(`${this.$route.params.id}`, {
          situation_id: 2,
        })
      } catch (error) {
        console.log(error)
      }
    },

    async approveTicket() {
      try {
        await ticketsService.approveById(`${this.$route.params.id}`)
        this.getTicketById()
        this.$toast.success('Chamado aprovado', {
          position: 'top-right',
        })
      } catch (error) {
        console.log(error)
      }
    },
    async disapproveTicket() {
      try {
        await ticketsService.disapproveById(`${this.$route.params.id}`)
        this.getTicketById()
        this.$toast.success('Chamado recusado', {
          position: 'top-right',
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
