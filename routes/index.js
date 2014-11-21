var express = require('express');
var router = express.Router();
var models = require('../models/');


/* GET home page. */
router.get('/', function(req, res) {
  models.Page.find({}, function(err, books){
    res.render('index', { books: books });
  })
});

router.get('/add', function(req, res) {
  res.render('add');
});

router.get('/show/:url_name', function(req, res){
  var url_name = req.params.url_name;

  models.Page.find({url_name: url_name}, function(err, book){
    res.render('show', { book: book[0]});    
  })
});

router.get('/show/:url_name/edit', function(req, res){
  models.Page.find({url_name: req.params.url_name}, function(err, book){
    res.render('show', { book: book[0], editing: true });
  });
});

router.get('/show/:url_name/delete', function(req,res){
  var url_name = req.params.url_name;
  models.Page.find({ url_name: url_name }).remove(function(err, deleted){
    console.log('deleted: ', deleted)
    res.redirect('/');
  });
});

router.post('/add/submit/:url_name', function(req, res){
  console.log(req.body)
  if(req.params.url_name !== 'new'){
    models.Page.findOne({url_name: req.params.url_name}, function(err, book){
      book.title = req.body['book-title'];
      book.body = req.body['book-content'];
      book.url_name = generateUrl(book.title);
      book.save();
      console.log("updated book: ", book);
      res.redirect('/show/'+book.url_name);
    });
  } else {
    var title = req.body['book-title'];
    var content = req.body['book-content'];
    var url_name = generateUrl(title);

    function generateUrl(title){
      return title.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
    };

    var p = new models.Page({ "title": title, "body":content, "url_name": url_name});
    p.save();
    res.redirect('/');
  }
});


module.exports = router;
