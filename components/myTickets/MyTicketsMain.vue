<template>
  <div class="mt-3 bg-white min-h-[80vh]">
    <div class="grid grid-cols-3 px-3 py-3">
      <div>
        <v-btn
          class="ma-2 white--text"
          color="#2271a1"
          @click="dialogCreate = true"
        >
          <v-icon left> mdi-plus </v-icon>

          Novo chamado</v-btn
        >
      </div>
      <div class="col-start-3">
        <v-text-field
          v-model="search"
          class="ma-2"
          dense
          append-icon="mdi-magnify"
          label="Pesquisar"
          outlined
        ></v-text-field>
      </div>
    </div>
    <div class="bg-white px-4 m-0 flex justify-between">
      <v-select
        :items="itemsType"
        item-text="text"
        item-value="id"
        v-model="type"
        @change="getTickets"
        outlined
        dense
        class="custom-select"
      ></v-select>

      <div class="mx-6">
        <v-btn
          v-show="showApproveButton"
          small
          dark
          @click="approveTickets"
          color="#004011"
          >Aprovar</v-btn
        >
        <v-btn
          v-show="showDeleteButton"
          small
          @click="deleteTickets"
          color="error"
          >excluir</v-btn
        >
      </div>
    </div>

    <div class="p-3">
      <v-data-table
        :headers="headers"
        v-model="selectedItems"
        :items="tickets"
        :search="search"
        :loading="loading"
        loading-text="Carregando"
        style="cursor: pointer"
        show-select
        :footer-props="{
          itemsPerPageText: 'Resultados por página',
          itemsPerPageOptions: [1, 10, 15, 50, -1],
          showFirstLastPage: true,
          pageText: '{0}-{1} de {2}',
        }"
        @click:row="openDetails"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.id="{ item }">
          <span>#{{ item.id }}</span>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.situation.name="{ item }">
          <v-chip label small :color="item.situation.colors" dark>
            {{ item.situation.name }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.priority.name="{ item }">
          <v-chip
            label
            small
            :color="getColorPriority(item.priority.name)"
            dark
          >
            {{ item.priority.name }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.created_at="{ item }">
          <span>
            {{ formattedDate(item.created_at) }}
          </span>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.updated_at="{ item }">
          <span>{{ formattedDate(item.updated_at) }}</span>
        </template>
      </v-data-table>
    </div>

    <v-dialog
      v-model="dialogCreate"
      max-width="50vw"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <c-ticket-create
          @dialogCreate="dialogChild"
          :users="users"
          :categories="categories"
          :priorities="priorities"
          :clients="clients"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CTicketCreate from '../tickets/CTicketCreate.vue'
import dayjs from 'dayjs'
export default {
  components: { CTicketCreate },
  data() {
    return {
      dialogCreate: false,
      loading: false,
      search: null,
      dialogCreate: false,
      showApproveButton: false,
      showDeleteButton: false,
      selectedItems: [],
      tickets: [],
      users: [],
      categories: [],
      priorities: [],
      cards: [],
      clients: [],
      approvers: [],
      itemsType: [
        { id: 'O', text: 'Abertos' },
        { id: 'C', text: 'Concluídos' },
        { id: 'T', text: 'Todos' },
        { id: 'A', text: 'Aguardando Aprovação' },
        { id: 'P', text: 'Pendente de autorização' },
      ],
      type: 'O',
      filter: null,
      activeCard: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          width: '5%',
        },

        {
          text: 'Assunto',
          align: 'start',
          value: 'subject',
          sortable: false,
          width: '20%',
        },
        {
          text: 'Cliente',
          align: 'start',
          value: 'user.name',
          sortable: true,
          width: '15%',
        },
        {
          text: 'Organização',
          align: 'start',
          value: 'client.trade_name',
          sortable: true,
          width: '15%',
        },

        {
          text: 'Prioridade',
          align: 'start',
          value: 'priority.name',
          sortable: true,
          width: '10%',
        },

        {
          text: 'Data',
          align: 'start',
          value: 'created_at',
          sortable: true,
          width: '12%',
        },
        {
          text: 'Atualizado',
          align: 'start',
          value: 'updated_at',
          sortable: true,
          width: '12%',
        },
        {
          text: 'Status',
          align: 'start',
          value: 'situation.name',
          sortable: true,
          width: '10%',
        },
      ],
    }
  },
  mounted() {
    this.getData(), this.getTickets()
  },

  computed: {
    selectedIds() {
      return this.selectedItems.map((item) => item.id)
    },
  },
  methods: {
    async getData() {
      const [priorities, categories, situations, clients] = await Promise.all([
        this.$axios.$get('/priorities/'),
        this.$axios.$get('/categories/'),
        this.$axios.$get('/situations/'),
        this.$axios.$get(`/users/clients`),
      ])

      this.priorities = priorities
      this.categories = categories
      this.situations = situations
      this.clients = clients
    },
    async getTickets() {
      this.loading = true
      const tickets = await this.$axios.$get(`/tickets/byUser/${this.type}`)
      this.tickets = tickets
      this.loading = false
    },

    dialogChild(dialogCreate) {
      this.dialogCreate = dialogCreate
    },

    showTickets(id, card) {
      if (this.activeCard === id) {
        this.activeCard = null
        this.cards.forEach((card) => {
          card.isActive = false
        })
        this.filter = null
      } else {
        this.activeCard = id
        this.cards.forEach((c) => {
          c.isActive = c.id === card.id

          this.filter = id
        })

        this.$emit('filter-changed', this.filter)
      }
    },

    async approveTickets() {
      try {
        const isValidForApproval = this.selectedItems.every((item) =>
          ['A', 'P'].includes(item.situation.type)
        )

        if (!isValidForApproval) {
          this.$toast.warning(
            'Apenas chamados Aguardando Aprovação e Pendente de Autorização podem ser aprovados.',
            {
              position: 'top-center',
            }
          )
          return
        }
        await this.$axios.patch('/tickets/approval', this.selectedIds)
        this.getTickets()
        this.getData()
        this.showApproveButton = false
        this.$toast.success('Chamado(s) Aprovados(s)', {
          position: 'top-center',
        })
      } catch (error) {
        console.log(error)

        this.$toast.error('Erro ao atualizar os dados', {
          position: 'top-center',
        })
      }
    },

    updateFilter(newFilter) {
      this.filter = newFilter
    },

    async deleteTickets() {
      try {
        await this.$axios.delete('/tickets', {
          data: this.selectedIds,
        })

        this.getTickets()
        this.getData()
        this.showDeleteButton = false
        this.$toast.success('Chamado(s) Excluído(s)', {
          position: 'top-center',
        })
      } catch (error) {
        console.log(error)

        this.$toast.error('Erro ao atualizar os dados', {
          position: 'top-center',
        })
      }
    },

    openDetails(value) {
      this.$router.push(`tickets/${value.id}`)
    },

    getColorPriority(priority) {
      switch (priority) {
        case 'Baixa':
          return 'green'
          break
        case 'Alta':
          return 'orange'
          break
        case 'Urgente':
          return 'red'
          break

        default:
          return 'blue'
          break
      }
    },

    formattedDate(d) {
      return dayjs(d).format('DD/MM/YYYY HH:mm')
    },
  },

  watch: {
    selectedItems: {
      handler(newSelectedItems) {
        this.showApproveButton = newSelectedItems.some((item) =>
          ['A', 'P'].includes(item.situation.type)
        )

        const allHaveSituation1 = newSelectedItems.every(
          (item) => item.situation_id === 1
        )
        this.showDeleteButton = allHaveSituation1
      },
      deep: true,
    },
  },
}
</script>

<style>
.custom-select {
  max-width: 250px !important;
}

table th + th {
  border-left: 1px solid #dddddd;
}
table td + td {
  border-left: 1px solid #dddddd;
}

table {
  border: 1px solid #dddddd;
}
</style>
