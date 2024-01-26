module.exports = {
  apps: [
    {
      name: 'portal',
      exec_mode: 'cluster',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
