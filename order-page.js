const display = document.getElementById("display-data");

async function dispalyOrders() {
    fetch('https://restro-management.vercel.app/order/getAll', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let dataDisplay = json.map((order) => {
                const orderId = order._id;
                let itemsDisplay = order.items.map((item) => {
                    const { name, quantity } = item;
                    console.log(item);

                })

                return ``;

            }).join("");

            display.innerHTML = dataDisplay;
        });
}

// console.log(1)

// async function dispalyOrders() {
//     const res = await fetch('https://restro-management.vercel.app/order/getAll', {
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
//         }
//     })
//     console.log(res.data);
// }

