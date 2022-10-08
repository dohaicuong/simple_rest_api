import { app } from './app'

app
  .listen({ host: '0.0.0.0', port: 4000 })
  .then(url => console.log(`Server started at ${url}`))
