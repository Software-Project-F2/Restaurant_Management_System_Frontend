const menu = document.querySelector(".left");
const cart = document.querySelector(".right");

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
            
            let column = createColumn(item.name, item.price, item.quantity);
            currentRow.appendChild(column);
        });
        itemCount = ic;
    });
}

function createColumn(iName, iPrice, iQuantity){
    let column = document.createElement("div");
    column.classList.add("col-lg-3", "col-md-6")
    let itemCard = document.createElement("div");
    itemCard.classList.add("item-card", );
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
    quantity.innerHTML = iQuantity + " items are available"; 
    itemCard.appendChild(quantity);
    let addButn = document.createElement("button");
    addButn.classList.add("butn", "add-butn");
    addButn.innerHTML = "Add!";
    itemCard.appendChild(addButn);
    addButn.addEventListener("click", addItem)
    column.appendChild(itemCard);
    return column;
}

function addItem(e){
    let itemCard = e.srcElement.parentElement;
    let name = itemCard.getElementsByClassName("item-name")[0].innerHTML;
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = name;
    let cart = document.getElementsByClassName("cart")[0];
    cart.appendChild(cartItem);

}