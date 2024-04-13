let rowCount = 1;
let itemCount = 1;

async function addItem(){

    let itemPrice = document.querySelector("input[name=iPrice]");
    let itemName = document.querySelector("input[name=iName]");
    let itemQuantity = document.querySelector("input[name=iQuantity");

    if(itemName.value.length === 0 || itemPrice.value.length === 0 || itemQuantity.value.length === 0){
        alert("Please enter the required information");
        return;
    }
    const npat = /^[0-9]+$/
    if(!itemPrice.value.match(npat)){
        alert("Please enter a numeric value for item price");
        return;
    }
    if(!itemQuantity.value.match(npat)){
        alert("Please enter a numeric value for item quantity");
        return;
    }

    newItem = {
        "name" : itemName.value,
        "price" : itemPrice.value,
        "description": itemQuantity.value + " items are available"
    };

    fetch('https://restro-management.vercel.app/menu/add', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
          }
        })
            .then((response) => response.json())
            .then((json) =>{
                console.log(json);
                let currentRow = document.querySelector(".row"+rowCount);

                const menu = document.getElementById("menu");
                itemCount++;
                if(itemCount%4 === 0){
                    rowCount++;
                    let currentRow = document.createElement("div");
                    currentRow.classList.add("row", "row"+ rowCount);
                    menu.appendChild(currentRow);
                }
                
                let column = createColumn(itemName.value, itemPrice.value, itemQuantity.value);

                currentRow.appendChild(column);

                itemName.value = "";
                itemPrice.value = "";
                itemQuantity.value = "";
            });
}

function createColumn(iName, iPrice, iQuantity, id){
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
    price.classList.add("item-quantity");
    quantity.innerHTML = iQuantity + "";
    itemCard.appendChild(quantity);
    let delButn = document.createElement("button");
    delButn.classList.add("butn", "del-butn");
    delButn.innerHTML = "delete";
    delButn.addEventListener("click", deleteItem);
    itemCard.appendChild(delButn);
    column.appendChild(itemCard);
    itemCard.setAttribute('data-id', id);
    return column;
}

const id = sessionStorage.getItem("userId");

function displayMenu(ic){
    fetch('https://restro-management.vercel.app/menu/getall/' + id, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        }
    })
    .then((response) => response.json())
    .then((json) => {
        json.forEach(item => {
            let currentRow = document.querySelector(".row"+rowCount);
            const menu = document.getElementById("menu");
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

function deleteItem(e){
    let delCard =  e.srcElement.parentElement;
    let id = delCard.getAttribute("data-id");
    fetch('https://restro-management.vercel.app/menu/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        }
    })
    .then((response) => response.json())
    .then((json) => {
        delCard.parentElement.remove();
        console.log(json);
    })
}