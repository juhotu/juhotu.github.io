// Products are saved on array and include id, src, title, price and type information
let products = [{"id":0,"src":"img/0.png","title":"Strawberry","price":2,"type":1},{"id":1,"src":"img/1.png","title":"Blueberry","price":1.5,"type":2},{"id":2,"src":"img/2.png","title":"Blackberry","price":3,"type":3},{"id":3,"src":"img/3.png","title":"Cherry","price":4,"type":1},{"id":4,"src":"img/4.png","title":"Raspberry","price":3.5,"type":1},{"id":5,"src":"img/5.png","title":"Acai","price":2,"type":3}];
let index; let type; let cart;

$(document).ready(function() { // Adds new cart on load and loads all products to user
    cart = new Cart();
    PrintProducts(0);
});

class Cart {
    constructor() {
        if (localStorage.getItem("coronaCart") != null) // If user has visited before, get data from localstorage
            this.addedProducts = JSON.parse(localStorage.getItem("coronaCart"));
        else // adds empty cart
            this.addedProducts = [];
    }

    addToCart(productId) {
        let count = $("#input-" + productId).val(); // gets amount data
        if (count > 0 && count < 999) { // small validation that inputted data is okay
            this.addedProducts.push([productId,count]);
            this.save();
        }
        else
            alert("Check input amount!");
    }

    showCart() {
        if (this.addedProducts.length > 0) { // when cart is not empty
            let print = "<h2>Added products:</h2><table><tr><th>id</th><th>Product Name</th><th>Amount</th><th>Price</th></tr>";
            let total = 0;
            for (let i = 0; i < this.addedProducts.length; i++) { // adds products on cart to table
                let productName = products[this.addedProducts[i][0]].title;
                let price = products[this.addedProducts[i][0]].price * this.addedProducts[i][1]; // calculates price for product row
                print += "<tr><td>" + this.addedProducts[i][0] + "</td><td>" + productName + "</td><td>" + this.addedProducts[i][1] + "</td><td>" + price + "</td><td><button onclick='cart.deleteProduct(" + i + ")'>&#10005;</button></td></tr>";
                total += price; // adds price to total
            }
            print += "<tr><td></td><td></td><th>total price</th><th>" + total + " &euro;</th></tr></table>" + "<div class='shop-buttons'><button onclick='cart.closeCart()'>Continue shopping</button><button onclick='cart.empty()'>Empty Cart</button><button onclick='cart.ordered()'>Confirm order</button></div>";
            $("#shopping-cart").dialog({title: "Shopping cart"}).html(print);
        }
        else // empty cart print
            $("#shopping-cart").dialog({title: "Shopping cart"}).html("Shopping cart is empty<br>Add products to cart by choosing the amount to order and press add to cart button");
    }

    save() { // saves cart to localstorage
        localStorage.setItem("coronaCart", JSON.stringify(this.addedProducts));
    }

    empty() {
        cart.addedProducts = []; // clears cart
        localStorage.clear(); // clears localstorage
        cart.save(); // saves cart
        cart.showCart();
    }

    closeCart() {
        $("#shopping-cart").dialog('close');
    }

    deleteProduct(id) {
        this.addedProducts.splice(id, 1); // deletes product row in question
        this.save();
        this.showCart();
    }

    ordered() {
        $("#shopping-cart").dialog({title: "Order confirmed"}).html("Thanks for your order!");
        window.setTimeout(this.empty, 5000);
    }
}

function PrintProducts (type) {
    $("#productlist").html("");
    if (type === 0) { // prints all products
        for (index = 0; index < products.length; index++) {
            let item = "<div id='item-" + index + "'><img src='" + products[index].src + "' alt='photo'/><h2>" + products[index].title + "</h2><p>" + products[index].price + " € / &#8467; </p><input id='input-" + index + "' type='number' min='1' value='1'><button class='add-cart' onclick='cart.addToCart(" + index + ")'>Add to <i class=\"fa fa-shopping-cart\"></i></button></div>";
            $("#productlist").append(item);
        }
    }
    else { // prints certain type of products
        for (index = 0; index < products.length; index++) {
            if (type === products[index].type) {
                let item = "<div id='item-" + index + "'><img src='" + products[index].src + "' alt='photo'/><h2>" + products[index].title + "</h2><p>" + products[index].price + " € / &#8467; </p><input id='input-" + index + "' type='number' min='1' value='1'><button class='add-cart' onclick='cart.addToCart(" + index + ")'>Add to <i class=\"fa fa-shopping-cart\"></i></button></div>";
                $("#productlist").append(item);
            }
        }
    }
}

$("#cart").click(function (event) {
    cart.showCart();
});