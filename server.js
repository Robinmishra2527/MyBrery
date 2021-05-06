if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
//  our required libreries 
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const mongoose = require('mongoose')  
  const indexRouter = require('./routes/index')
 
//   our teplate setup
  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
  app.use(express.static('public'))
  
// our mongoose database conection
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))
  
  app.use('/', indexRouter)
// our listener 
  app.listen(process.env.PORT || 3000)