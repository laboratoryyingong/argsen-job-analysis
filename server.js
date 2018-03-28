/**
 * @file: app.js
 * @description : TODO: 
 */

const express = require('express');
const routes = require('./routes/index.js')
const config = require('./config/config.json');

const PORT = config.PORT || 3000;

const app = express();

/**
 * setup express application 
 */
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

/**
 * setup routes
 */
routes(app);

/**
 * start express server 
 */
app.listen(PORT, function(){
    console.log("Job analysis server on port : " + PORT);
});
