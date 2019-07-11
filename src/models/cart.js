module.exports = function Cart(oldCart) {
    this.products = oldCart.products || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.currency = oldCart.currency || 'SEK';
    function objectValues(obj) {
        let vals = [];
        for (const prop in obj) {
            vals.push(obj[prop]);
        }
        return vals;
    }
    this.add = function(product, id) {
        let storedProduct = this.products[id];
        if(!storedProduct) {
            storedProduct = this.products[id] = {product: product, qty: 0, price: 0, currency: product.currency };
        }
        
        storedProduct.qty++;
        storedProduct.price = storedProduct.product.price * storedProduct.qty;
        this.totalQty++;
        let total = 0

        objectValues(this.products).forEach(data => {
            total = total + data.price
        })
        this.totalPrice = total
          
    }
    this.remove = function(product, id) {
        let storedProduct = this.products[id];
        storedProduct.qty--;
        if(storedProduct.qty < 1) {
            delete this.products[id];
        }
        storedProduct.price -= storedProduct.product.price;
        this.totalQty-- 
        this.totalPrice -= storedProduct.product.price;
        this.currency = storedProduct.currency;
    }

    this.generateArray = function() {
        let arr = [];
        for (let id in this.products) {
            arr.push(this.products[id]);
        }
        return arr;
    };
}