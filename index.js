const express = require('express')
const app = express()
const port = 3000

// route
app.get('/MyTask', (req, res) => {
  res.send('My Task!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})