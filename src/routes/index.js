const express = require('express');
const router = express.Router();
const fs = require('fs') ;
const products = JSON.parse(fs.readFileSync(`${__dirname}/../views/data/products.json`, 'utf8'))
const Cart = require('../models/cart')

router.get('/', function(req, res) {
    res.render('home', {products: products});
})

router.get('/about', function(req, res) {
    res.render('about');
})

router.get('/product/:id', function(req, res) {
    if(req.params.id >= 1 && req.params.id <= 8){
        res.render('product', {
            product: JSON.parse(fs.readFileSync(`${__dirname}/../views/data/${req.params.id}.json`, 'utf8'))
        });
    }
})

router.get('/add-to-cart/:id', function(req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    fs.readFile(`${__dirname}/../views/data/${req.params.id}.json`, 'utf8', function read(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(JSON.parse(product), productId);
        req.session.cart = cart;
        res.redirect('/')
    });
})

router.get('/remove-from-cart/:id', function(req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    fs.readFile(`${__dirname}/../views/data/${req.params.id}.json`, 'utf8', function read(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.remove(JSON.parse(product), productId);
        req.session.cart = cart;
        res.redirect('/cart')
    });
})

router.get('/cart', function(req, res) {
    if(!req.session.cart) {
        return res.render('cart', {products: null})
    }
    const cart = new Cart(req.session.cart);
    res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, currency: cart.currency});
})

module.exports = router;