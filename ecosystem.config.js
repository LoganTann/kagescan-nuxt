module.exports = {
  apps: [
    {
      name: 'Kagescan-ssr-prod',
      port: '9003',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      env: {
      	NITRO_PORT: '9003',
      	NITRO_HOST: 'localhost'
      }
    }
  ]
}
