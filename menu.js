
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

    let column = createColumn(itemName.value, itemPrice.value);

    currentRow.appendChild(column);

    itemName.value = "";
    itemPrice.value = "";
}

function createColumn(iName, iPrice){
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
    price.innerHTML = iPrice; 
    itemCard.appendChild(price);
    column.appendChild(itemCard);
    return column;
}

function displayMenu(ic){
    const menu = document.getElementById("menu");
    
    x.forEach(item => {
        ic++;
        let currentRow = document.querySelector(".row"+rowCount);
        if(ic%4 === 0){
            rowCount++;
            let currentRow = document.createElement("div");
            currentRow.classList.add("row", "row"+ rowCount);
            menu.appendChild(currentRow);
        }
        
        let column = createColumn(item.Name, item.Price);
        currentRow.appendChild(column);
    });
    itemCount = ic;
}