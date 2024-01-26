<template>
  <header class="bg-white headerDefault h-20 clipped-right sticky top-0 z-10">
    <nav class="px-2 h-full relative">
      <div class="grid grid-cols-12 h-full content-center">
        <div class="col-span-2">
          <img src="~/assets/logo.jpg" alt="" class="w-52" />
        </div>

        <div class="col-span-7">
          <ul
            class="hidden md:flex md:items-center md:space-x-4 w-full h-full justify-start"
          >
            <li
              class="text-base hover:text-gray-30"
              v-for="item in items"
              :key="item.id"
            >
              <v-btn color="#2271a1" text link :to="item.to">
                <span class="font-semibold text-sm"> {{ item.title }}</span>
              </v-btn>
            </li>
          </ul>
        </div>
        <div class="col-start-10 col-span-3 flex justify-end items-center mr-6">
          <span
            class="mr-2 uppercase text-sm text-default leading-normal font-semibold tracking-wider whitespace-nowrap"
            >{{ loggedUser }}</span
          >
          <img
            class="w-12 h-12 rounded-full mr-4"
            src="../../assets/avatar.png"
            alt="Avatar "
          />
          <v-menu transition="scale-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#2271a1" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item :to="'/account'">
                <v-list-item-title>
                  <v-icon left>mdi-account</v-icon>
                  Minha Conta</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>
                  <v-icon left>mdi-logout</v-icon>
                  Sair</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <div class="mx-4">
            <v-badge color="error" overlap content="6">
              <v-btn dark icon> <v-icon dark>mdi-bell</v-icon></v-btn>
            </v-badge>
          </div> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: 'Exato Consultoria',

      items: [
        {
          id: '1',
          icon: 'mdi-ticket-confirmation',
          title: 'Meus Chamados',
          to: '/mytickets',
        },
        {
          id: '2',
          icon: 'mdi-ticket-confirmation',
          title: 'Chamados',
          to: '/tickets',
        },

        // { id: '3', icon: 'mdi-poll', title: 'Relatórios', to: '/reports' },

        // {
        //   id: '4',
        //   icon: 'mdi-file-document-multiple',
        //   title: 'Cadastros',
        //   to: '/cadastro',
        // },
      ],

      menu: [
        { title: 'Minha Conta', icon: 'mdi-account' },
        { title: 'Sair', icon: 'mdi-logout' },
      ],
    }
  },
  computed: {
    loggedUser() {
      return this.$auth.user.name
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style>
.headerDefault {
  /* background: #2271a1;
  background: linear-gradient(
    0deg,
    rgba(140, 26, 27, 1) 0%,
    rgba(180, 84, 92, 1) 100%
  ) !important; */
}
</style>
