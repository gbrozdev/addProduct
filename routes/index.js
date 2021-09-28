const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
var db = require('../connection')

/* GET home page. */

router.get('/',async function(req, res) {
  //}}}}}}}}}}}}}}show nothing when user remove all}}}}}}}}}}}}}}}}}
  let products = await db.get().collection('products').find().toArray()
  if (products.length === 0) {
    console.log('dfgedfg');
    res.render('index',{err:true});
  }else{

    res.render('index',{products});
  }
});

router.get('/list',async function(req, res) {
  let lists = await db.get().collection('list').find().toArray()
  if (lists.length === 0) {
    console.log('dfgedfg');
    res.render('list',{err:true});
  }else{
  res.render('list' , {lists});
  }
});

router.post('/submit', async function(req, res) {
  let product = req.body
  db.get().collection('products').insertOne(product)
  res.redirect('/');
});

router.get('/delete', async function(req, res) {
  db.get().collection('products').remove()
  db.get().collection('list').remove()
  res.redirect('/'); 
});

router.get('/delete/:Id', async function(req, res) {
  Id = req.params.Id
  db.get().collection('products').deleteOne({_id:ObjectId(Id)})
  db.get().collection('list').deleteOne({_id:ObjectId(Id)})
  res.redirect('/');
});
router.get('/deletecart', async function(req, res) {
  db.get().collection('list').remove()
  res.redirect('/'); 
});

router.get('/deletecart/:Id', async function(req, res) {
  Id = req.params.Id
  db.get().collection('list').deleteOne({_id:ObjectId(Id)})
  res.redirect('/list');
});

router.get('/add/:Id', async function(req, res) {
  Id = req.params.Id
  let list = await db.get().collection('products').findOne({_id:ObjectId(Id)})
  let duplist = await db.get().collection('list').findOne({_id:ObjectId(Id)})
  if (duplist) {
    console.log('duplication');
 
  } else {
    db.get().collection('list').insertOne(list)   
  }
  res.redirect('/');
});



module.exports = router;
