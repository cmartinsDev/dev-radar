const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app =  express();
// user: omnistack
// pwd: omnistack
// db: week10
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-mw26n.mongodb.net/week10?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true  
})
// Methods HTTP: GET,POST, PUT, DELETE

// Type of params:
// Query Params: request.query (Filter, sort, pagenation, ...)
// Route Params: request.params (Identify resource to change or remove)
// Boddy Params: request.body (data to create or change record)
app.use(cors({origin: true, credentials: true }))
app.use(express.json()); 
app.use(routes);

app.listen(3333);

