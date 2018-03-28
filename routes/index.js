/**
 * @file: index.js
 * @description : routes index files 
 */

 module.exports = function(app){
    app.get('/', function(req, res){
        res.render('pages/index');
    });

    app.get('/chart', function(req, res){
        res.render('pages/chart');
    });
 };