
let rowCount = 1;
let itemCount = 1;

function addItem(){

    let itemPrice = document.querySelector("input[name=iPrice]");
    let itemName = document.querySelector("input[name=iName]");

    itemCount++;
    
    let currentRow = document.querySelector(".row"+rowCount);

    const menu = document.getElementById("menu");

    if(itemCount%4 === 0){
        rowCount++;
        let currentRow = document.createElement("div");
        currentRow.classList.add("row", "row"+ rowCount);
        menu.appendChild(currentRow);
    }
    let column = document.createElement("div");
    column.classList.add("col-lg-3", "col-md-6")
    currentRow.appendChild(column);
    let itemCard = document.createElement("div");
    itemCard.classList.add("item-card", );
    let name = document.createElement("h3");
    name.classList.add("item-name");
    name.innerHTML = itemName.value;
    itemCard.appendChild(name);
    let price = document.createElement("h4");
    price.classList.add("item-price");
    price.innerHTML = itemPrice.value; 
    itemCard.appendChild(price);
    column.appendChild(itemCard);

    itemName.value = "";
    itemPrice.value = "";
}