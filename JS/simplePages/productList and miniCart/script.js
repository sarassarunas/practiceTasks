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
                <div class="rating">
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

function addToCart(e) {
    let id=+e.target.parentElement.parentElement.parentElement.dataset.id;
    let qty = 1;
    let price = 0;
    console.log(produktai.products[produktai.products.findIndex(idx =>idx.id===id)].price);
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
// console.log(renderPlace);

function display() {
    renderPlaceItems.innerHTML=``;
    for(let item in toBuy) {
    let index = produktai.products.findIndex(x => x.id ===toBuy[item][`id`]);
    // console.log(index);
    renderPlaceItems.innerHTML+=
    `
    <div class=itemContainer>
        <div class="imgContainer">
        <img src="${produktai.products[index].thumbnail}">
        </div>
        <div>
            <input id="${toBuy[item].id}" type="number" value="${toBuy[item].qty}" onchange="changeQty(event)">
        </div>
        <div class="cartItemPrice">
            <span class="itemPrice">Item price:${(produktai.products[index].price*((100-produktai.products[index].discountPercentage)/100)).toFixed(2)} €</span>
            <span class="allItemPrice">Total price:${(produktai.products[index].price*((100-produktai.products[index].discountPercentage)/100)).toFixed(2)*toBuy[item].qty} €</span.
        </div>
    </div>    
    `
    }
}

function changeQty(e) {
    console.log(e);
}