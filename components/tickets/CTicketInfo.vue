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
        {{ formattedDeadline }}
      </span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
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

  computed: {
    formattedDeadline() {
      if (this.ticket.deadline) {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const zonedDeadline = dayjs(this.ticket.deadline).tz(userTimeZone)

        const adjustedDeadline = zonedDeadline
          .add(23, 'hours')
          .add(59, 'minutes')
          .add(59, 'seconds')

        return adjustedDeadline.format('DD/MM/YYYY')
      } else {
        return null
      }
    },
  },
}
</script>

<style></style>
