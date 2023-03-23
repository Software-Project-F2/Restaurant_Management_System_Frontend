const menu = document.querySelector(".left");
const cart = document.querySelector(".right");

function displayRestaurants(){
    const select = document.getElementsByName("select")[0];

    fetch('https://restro-management.vercel.app/user/getall/', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        }
    })
    .then((response) => response.json())
    .then((json) => {
            console.log(json);
            json.forEach(user => {
                if(user.)
            });
        });
}

function displayMenu(){
    
}