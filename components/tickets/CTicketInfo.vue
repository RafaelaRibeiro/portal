<template>
  <div class="mx-2">
    <!-- <div
      class="bg-gray-300 flex justify-center mx-1 my-3 pa-3 rounded-md border border-slate-300 font-medium"
    >
      Informações do ticket
    </div> -->
    <div class="mx-1 my-4">
      <v-chip dark :color="situation.colors" label>{{ situation.name }}</v-chip>
    </div>

    <div class="mx-1 mb-2">
      <span>
        <strong class="font-semibold text-gray-700">Aprovador: </strong>
        {{ ticket.approver?.name ? ticket.approver.name : 'Sem aprovador' }}
      </span>
    </div>
    <div class="mx-1 mb-2">
      <span>
        <strong class="font-semibold text-gray-700">Organização: </strong>
        {{ ticket?.client?.trade_name ? ticket.client.trade_name : '' }}
      </span>
    </div>
    <div class="mx-1 mb-2">
      <span>
        <strong class="font-semibold text-gray-700">Atendente: </strong>
        {{ ticket.agent?.name }}
      </span>
    </div>
    <div class="mx-1 mb-2">
      <span>
        <strong class="font-semibold text-gray-700">Deadline: </strong>
        {{
          ticket.deadline
            ? new Date(ticket.deadline).toLocaleDateString('pt-br', options)
            : ''
        }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'situation'],
  data() {
    return {
      options: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
    }
  },
}
</script>

<style></style>
