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

    //todo: add details pages

    app.get('/details', function(req, res){
        res.render('pages/chart');
    });
 };