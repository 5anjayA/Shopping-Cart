if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

let products= [
    {
        name: 'Apples',
        tag: 'apples',
        price: 1.35,
        inCart: 0
    },
    {
        name: 'Banana',
        tag: 'banana',
        price: 0.70,
        inCart: 0
    },
    {
        name: 'Bread',
        tag: 'bread',
        price: 2.05,
        inCart: 0
    },
    {
        name: 'Carrots',
        tag: 'carrots',
        price: 1.10,
        inCart: 0
    },
    {
        name: 'Eggs',
        tag: 'eggs',
        price: 1.80,
        inCart: 0
    },
    {
        name: 'Milk',
        tag: 'milk',
        price: 1.05,
        inCart: 0
    },
    {
        name: 'Lettuce',
        tag: 'lettuce',
        price: 0.75,
        inCart: 0
    },
    {
        name: 'Tomatoes',
        tag: 'tomatoes' ,
        price: 0.60,
        inCart: 0
    },
    {
        name: 'Crisps',
        tag: 'crisps.',
        price: 2,
        inCart: 0
  }
]

function ready() {
    let carts = document.getElementsByClassName('add-cart');

for (let i = 0; i < carts.length; i++) {
    var button = carts[i]
button.addEventListener('click', function() {
    cartNumbers(products[i]);
    totalCost(products[i])
})
}
function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
 
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
   document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
onLoadCartNumbers();

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    
    if (cartItems != null) {
        if(cartItems[product.tag] == undefined) {
         cartItems = {
             ...cartItems,
             [product.tag]: product
         }
    } 
    cartItems[product.tag].inCart += 1;
        
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  
}
   
function totalCost(product){

    let cartCost = localStorage.getItem('totalCost');

    console.log("The cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);

    } else {
    localStorage.setItem('totalCost', product.price);
    }
    
}


}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementsByClassName("products-container");
   

console.log(cartItems)


    if( cartItems && productContainer ) {
        productContainer.innerHTML= "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <img src="./img/${item.tag}.jpeg">
            </div>
            `
        })
        
    }
}
displayCart();

