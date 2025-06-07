let eilute=``;
for(const produktas of produktai.products) {
    eilute+= `
        <tr data-id="${produktas.id}">
            <td><div class="imgContainer">
                ${produktas.discountPercentage===0 ? `<img src="${produktas.thumbnail}">` : `<img src="`+produktas.thumbnail+`"><div class="displayDiscount">- `+produktas.discountPercentage+` %</div>`}    
            
            </div></td>
            <td><div class="aprasymasContainer">
                <div class="title">
                    <a href="">${produktas.title}</a>
                </div>
                <div class="rating" title="Rating: ${produktas.rating}">
                    <div class="active" style="width:${produktas.rating*20}%">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                    <div class="inActive">
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                    </div>     
                    
                </div>
                <div class="aprasymas">
                    ${produktas.description}
                </div>
            </div></td>
            <td>
            <div class="kainos">
            ${produktas.discountPercentage===0 ? `<div class="price current">$ `+produktas.price+`</div>` : `<div class="price current priceWithDiscount">$ `+((Math.round(produktas.price*((100-produktas.discountPercentage)/100)*100))/100).toFixed(2)+`</div><div class="price oldPrice">$ `+produktas.price+`</div>`}
            </div>
            <div class="toBuy">
                <button class="addToCart" onclick="addToCart(event)">Add to Cart</button>
            </div>
            </td>
        </tr>
    `
};
document.querySelector(`table tbody`).innerHTML=eilute;

function toCartPage() {
    document.querySelector(`.productList`).style.display = `none`;
    document.querySelector(`.shopingCart`).style.display = `block`;
}
function toProductPage() {
    document.querySelector(`.productList`).style.display = `block`;
    document.querySelector(`.shopingCart`).style.display = `none`;
}

const toBuy = [];
let totalCartPrice = 0;
let totalShoppingPrice = 0;

function addToCart(e) {
    let id=+e.target.parentElement.parentElement.parentElement.dataset.id;
    let qty = 1;
    let itemIdx = produktai.products.findIndex(idx =>idx.id===id);
    let price = +(produktai.products[itemIdx].price*((100-produktai.products[itemIdx].discountPercentage)/100)).toFixed(2);
    console.log(price);
    // console.log(toBuy.filter(el=>el.id===id));
    if(toBuy.filter(el=>el.id===id).length>0){
        for(let product of toBuy) {
            if(product.id===id){
                product.qty++;
            }
        }
    } else {
        toBuy.push({id, qty, price});
    };

    // toBuy.push({id, qty});
    console.log(toBuy);
    display();
    // console.log(toBuy[0][`id`]);
    toCartPage();
}

let renderPlaceItems = document.querySelector(`.shopingCart .krepselis`);
let renderPlaceSum = document.querySelector(`.shopingCart .cartSum`);
let renderPlaceShipping = document.querySelector(`.shopingCart .shipping`);
let renderPlaceForm = document.querySelector(`.shopingCart .total`);
let renderPlaceTotalShopPrice = document.querySelector(`.shopingCart .totalShoppingPrice`);


1
function display() {
    renderPlaceItems.innerHTML=``;
    totalCartPrice = 0;
    for(let item in toBuy) {
    let index = produktai.products.findIndex(x => x.id ===toBuy[item][`id`]);
    
    totalCartPrice+=toBuy[item].qty*toBuy[item].price;
    renderPlaceItems.innerHTML+=
    `
    <div class=itemContainer>
        <div class="imgContainer">
        <img src="${produktai.products[index].thumbnail}">
        </div>
        <div>
            <input id="${toBuy[item].id}" type="number" value="${toBuy[item].qty}" min="1" onchange="changeQty(event)">
        </div>
        <div class="cartItemPrice">
            <div class="itemPrice">Item price: ${(produktai.products[index].price*((100-produktai.products[index].discountPercentage)/100)).toFixed(2)} €</div>
            <div class="totalItemPrice">Total price: ${(produktai.products[index].price*((100-produktai.products[index].discountPercentage)/100)*toBuy[item].qty).toFixed(2)} €</div>
        </div>
    </div>    
    `
    }
    renderPlaceSum.innerHTML=`<div class="totalCartPrice"> Krepšelio kaina: ${totalCartPrice.toFixed(2)} €</div>`

    if(toBuy.length>0) {
        renderPlaceForm.style.display='block';
    } else {
        renderPlaceForm.style.display='none';
    }

    totalPrice();
}


 

function shipping() {
    // renderPlaceShipping.innerHTML=`Hello`;
    
    let shippingPrice = document.querySelector('input[name="shipping"]:checked').value;
    console.log(shippingPrice);
    totalPrice();
}

function changeQty(e) {
    
    let id = +e.target.id;
    let ndx = toBuy.findIndex(x=>x.id===id);
    let qty = +e.target.value;
    
    if(qty<1) qty = 1;
    else qty = Math.floor(qty);
    toBuy[ndx].qty = qty;
    display();
    
}

function newSubmit(e) {
    e.preventDefault();
    // alert(JSON.stringify(toBuy));
    console.log(toBuy);
    console.log(+totalCartPrice.toFixed(2));
    let orderInfo = [];
    let name=document.querySelector('input[id="name"]').value;
    let lastName=document.querySelector('input[id="lastName"]').value;
    let address=document.querySelector('input[id="address"]').value;
    let postCode=document.querySelector('input[id="postCode"]').value;
    let shipping = document.querySelector('input[name="shipping"]:checked').id;
    let amount = +totalShoppingPrice.toFixed(2);
    
    orderInfo.push(toBuy);
    orderInfo.push({totalPrice:amount,shipping,name,lastName,address,postCode});
    
    console.log(orderInfo);
    alert(JSON.stringify(orderInfo));
}
function totalPrice() {
    let shippingPrice = +document.querySelector('input[name="shipping"]:checked').value;
    totalShoppingPrice=totalCartPrice+shippingPrice;
    renderPlaceTotalShopPrice.innerHTML=`Pilna užsakymo kaina: ${totalShoppingPrice.toFixed(2)} €`;
}