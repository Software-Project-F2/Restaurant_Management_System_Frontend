let itemCount = 0;
let ic = 0;
let rowCount = 1;

let id = [];

async function displayRestaurants(){
    const select = document.getElementsByTagName("select")[0];

    fetch('https://restro-management.vercel.app/user/getall/', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        }
    })
    .then((response) => response.json())
    .then((json) => {
            json.forEach(ele => {
                let option = document.createElement("option");
                if(ele.role === "restaurant"){
                    id.push(ele.name);
                    id.push(ele._id);
                    option.setAttribute("value", ele.name);
                    option.innerHTML = ele.name;
                    select.appendChild(option);
                }
            });
        });
}

let resId;

async function displayMenu(){
    let restaurant = document.getElementsByTagName("select")[0].value;
    for(let i=0; i<id.length; i=i+2){
        if(id[i] === restaurant){
            resId = id[i+1];
        }
    }
    const menu = document.getElementById("menu");
    fetch('https://restro-management.vercel.app/menu/getall/' + resId, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        }
    })
    .then((response) => response.json())
    .then((json) => {
        json.forEach(item => {
            
            let currentRow = document.querySelector(".row"+rowCount);
            const menu = document.getElementsByClassName("menu")[0];
            ic++;
            if(ic%4 === 0){
                rowCount++;
                let currentRow = document.createElement("div");
                currentRow.classList.add("row", "row"+ rowCount);
                menu.appendChild(currentRow);
            }
            
            let column = createColumn(item.name, item.price, item.description, item._id);
            currentRow.appendChild(column);
        });
        itemCount = ic;
    });
}

function createColumn(iName, iPrice, iQuantity, id){
    let column = document.createElement("div");
    column.classList.add("col-lg-3", "col-md-6")
    let itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    let name = document.createElement("h3");
    name.classList.add("item-name");
    name.innerHTML = iName;
    itemCard.appendChild(name);
    let price = document.createElement("h4");
    price.classList.add("item-price");
    price.innerHTML = "Rs. " + iPrice; 
    itemCard.appendChild(price);
    let quantity = document.createElement("em");
    quantity.classList.add("item-quantity");
    quantity.innerHTML = iQuantity + ""; 
    itemCard.appendChild(quantity);
    let addButn = document.createElement("button");
    addButn.classList.add("butn", "add-butn");
    addButn.innerHTML = "Add!";
    itemCard.appendChild(addButn);
    addButn.addEventListener("click", addItem)
    column.appendChild(itemCard);
    itemCard.setAttribute('data-id', id); 
    return column;
}

function addItem(e){
    let itemCard = e.srcElement.parentElement;
    let name = itemCard.getElementsByClassName("item-name")[0].innerHTML;
    let id = e.srcElement.parentElement.getAttribute("data-id");
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = name;
    cartItem.setAttribute('data-id', id);
    let cart = document.getElementsByClassName("cart")[0];
    cart.appendChild(cartItem);
    console.log(cartItem);
}

function placeOrder() {
    const customerId = sessionStorage.getItem("userId");
    const cartItems = document.querySelectorAll('.cart-item');
    const items = [];

    cartItems.forEach(cartItem => {
        console.log(cartItem);
        const itemName = cartItem.getAttribute("data-id");
        const itemQuantity = 1;
        items.push({ name: itemName, quantity: itemQuantity });
    });

    const requestBody = {
        restaurant: resId,
        customer: customerId,
        items: items
    };

    fetch('https://restro-management.vercel.app/order/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Order placed successfully:", data);
        alert("Your order has been placed!");
        const cart = document.querySelector('.cart');
        cart.remoreChild(cartItems);
    })
    .catch(error => {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again later.");
    });
}
