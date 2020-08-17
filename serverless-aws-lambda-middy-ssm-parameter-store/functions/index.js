const middy = require('middy')
const { ssm } = require('middy/middlewares')
const { serviceName, stage, deploy_time_value } = process.env

module.exports.handler = middy(async () => {
  return {
    deploy_time_value,
    configurable: process.env.someProp,
  }
}).use(
  ssm({
    cache: true,
    cacheExpiryInMillis: 1 * 60 * 1000, // For testing purposes just one minute cache time
    names: {
      config: `/${serviceName}/${stage}/index/config`,
    },
    onChange: () => {
      const config = JSON.parse(process.env.config)
      process.env.someProp = config.someProp
    },
  }),
)
