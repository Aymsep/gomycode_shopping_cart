const data = [
    {
        id: 1,
        name:'white headphone',
        image:'./images/headphone.png',
        price:75,
    },
    {
        id: 2,
        name:'apple watch',
        image:'./images/watch.png',
        price:234,
    },
]


const products = document.querySelector('.products')
const add_products = data.map((item,index)=>{
    return `
    
    <div  class="product">
    <div class="product_image">
        <img src="${item.image}" alt="" width="85">
        <p id="quantity_img">1</p>
        <div class="product_desc">
            <h4 id="product_title">${item.name}</h4>
            <span id="product_price" class="product-price">$${item.price}</span>
            <i  id="heart_icon" class="fa-regular fa-heart"></i>
        </div>
    </div>
    <div class="product_quantity">
        <div class="delete">
            <i id="trash_icon" data-id="${index + 1}" class="fa-sharp fa-solid fa-trash"></i>
            <i  id="check_icon" class="fa-solid fa-check"></i>
        </div>
        <div class="quantity">
            <i id="plus" data-id="${index + 1}" class="fa-solid fa-plus"></i>
            <p id="item_quantity" class="product-quantity" >1</p>
            <i id="minus" class="fa-solid fa-minus"></i>
        </div>
    </div>

</div>
    `
}).join(' ')
products.innerHTML = add_products


const heart_icon = document.querySelectorAll('#heart_icon')
const heart = Array.from(heart_icon).forEach((item)=>{
    item.addEventListener('click', (e) => {
        item.classList.toggle('fa-solid')
    })
})



const trash  = document.querySelectorAll('#trash_icon')
for(let i = 0; i < trash.length; i++){
    let btn = trash[i]
    btn.addEventListener('click', (e)=>{
        btn.classList.toggle('fa-trash')
        btn.classList.toggle('fa-sharp')
        btn.classList.toggle('fa-check')
        btn.parentElement.parentElement.parentElement.remove()
        // setTimeout(()=>{
        // },1000)
        updateprice()
    })
}


    const plus = document.querySelectorAll('#plus')
    const item_q = document.querySelectorAll('#item_quantity')
    const minus = document.querySelectorAll('#minus')
    for(let i = 0; i < plus.length; i++) {
        let icon_plus = plus[i]
        let total_q  = 1
        icon_plus.addEventListener('click',(e)=>{
            let q_element = icon_plus.nextElementSibling
            let increase_q = parseInt(q_element.innerHTML)
            let img_q = icon_plus.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling 
            let img_q_inc = parseInt(img_q.innerHTML) 
            let nwq = increase_q + 1
            q_element.innerHTML = nwq
            img_q.innerHTML = nwq
            updateprice()
        })
    }

    for(let j = 0; j < minus.length; j++) {
        let icon_minus = minus[j]
        icon_minus.addEventListener('click',(e)=>{
            let q_element = icon_minus.previousElementSibling
            let decrease_q = parseInt(q_element.innerHTML)
            if(decrease_q <= 1){
                return
            }
            let img_q = icon_minus.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling 
            let img_q_dec = parseInt(img_q.innerHTML) 
            let nwq = decrease_q - 1
            q_element.innerHTML = nwq
            img_q.innerHTML = nwq
            updateprice()
        })
    }
        const cart_product = document.querySelectorAll('.product')
        const p_total = document.querySelector('#product_total') 
        const current_price = Array.from(data).reduce((total,price)=>{
            return total + price.price
        },0)
        p_total.innerHTML = `$${current_price}.00`


function updateprice() {
    const cart_product = document.querySelectorAll('.product')
    const p_total = document.querySelector('#product_total') 
    const p_subtotal = document.querySelector('#product_sub')
    let total = 0
    for(let i = 0; i < cart_product.length; i++) {
        let product = cart_product[i]
        let price_prod = product.getElementsByClassName('product-price')[0]
        let quantity_prod = product.getElementsByClassName('product-quantity')[0]
        let price = parseFloat(price_prod.innerHTML.replace('$', ''))
        let quantity = quantity_prod.innerHTML
        total = total + (price * quantity)
    }
    p_total.innerHTML = `$${total + 8}.00`
    p_subtotal.innerHTML = `$${total}.00`
    console.log(total)
}
