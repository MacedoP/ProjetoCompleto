/*
    Vamos fazer a noss interacao
*/
const menu = document.querySelector("#menu");
const cart_modal = document.querySelector("#cart-modal");
const cart_btn = document.querySelector("#cart-btn");
const cartItemsContanier = document.querySelector("#cart-items");
const totalPrice = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cartConuter = document.querySelector(".cart-count");
const address = document.querySelector("#addres");
const addWarnAddres = document.querySelector("#address-warn");

let cart =[];


/*Configurando o aparecimento do nosso modal danado vida a ele*/
//Abrir o Modal
cart_btn.addEventListener('click',(evt)=>{
    // const clicado = evt.target
    // console.log("O botao que foi clicado é "+ clicado.innerHTML);
    updateCartModal();
    cart_modal.style.display = "flex"

})
//Fechando o nosso modal
cart_modal.addEventListener('click',(ev)=>{
    if(ev.target === cart_modal){
        cart_modal.style.display ="none"
    }
})

//Usando tbn close
closeModalBtn.addEventListener('click',(evet)=>{
    cart_modal.style.display = "none"
})

//Mostrando qual elemento do nosso main foi clicado
menu.addEventListener('click',(e)=>{
    let parentbutton = e.target.closest(".add-to-cart-btn")
    if(parentbutton){
        const nome = parentbutton.getAttribute("data-name")
        const price = parseFloat(parentbutton.getAttribute("data-price"))//Convetemos o price para Float
        // console.log(nome);
        // console.log(price);
        addToCart(nome,price)
    }
   
})

//Funcao para dicionar no nosso carrinho
function addToCart(nome, price){
    const verificarItem = cart.find(item => item.nome === nome)

    if(verificarItem){
        verificarItem.quantidade +=1;
    }else{
        cart.push({
            nome,
            price,
            quantidade: 1,
        })
    }
    updateCartModal()
    // alert("O item é "+ nome)
}

//Mostrando os item no Modal
function updateCartModal(){
    cartItemsContanier.innerHTML = "";

    let total =0;
    cart.map((el)=>{
        const cartItems = document.createElement("div")
        cartItems.classList.add("flex", "justify-between","mb-4","flex-col")

        cartItems.innerHTML = `
            <div class="flex items-center justify-between">

                <div>
                    <p class="font-medium">${el.nome}</p>
                    <p>Qtd:${el.quantidade}</p>
                    <p class="font-medium mt-2"> Ft ${el.price.toFixed(2)}</p>
                </div>

              
                    <button class="remove-cart-btn" data-name="${el.nome}">
                        Remover
                    </button>
              

            </div>
        `
        total += el.price * el.quantidade
        cartItemsContanier.appendChild(cartItems)
    })
    totalPrice.textContent = total//metodo usado para mostar a moeda ja em forma de tabua .toLocaleString("pt-BR",{ style:"currency", currency: "R$"});
    //Configurcao do Cart counter
    cartConuter.innerHTML = cart.length
}

//Funcao para remover um Item do carrinho

cartItemsContanier.addEventListener('click',(evt)=>{
    if(evt.target.classList.contains("remove-cart-btn")){//se o elemento no qual eu quero remover tem o botao remover entao quando clicado remove
        const nome =  evt.target.getAttribute("data-name");
       removeitemCart(nome);
    }
})


const removeitemCart = (nome)=>{

    const index = cart.findIndex(el => el.nome === nome);
        if(index !== -1){
            const item = cart[index];
            
            if(item.quantidade > 1){
                item.quantidade -= 1;
                updateCartModal();
                return;
            }

            cart.splice(index, 1);//se os elementos forem apenas 1 entao remove quando clicado no botao
            updateCartModal();
        }
            
}


//Configurcao para pegar o endere;co digitado no nosso input
address.addEventListener("input",(evt)=>{
    let inputValue = evt.target.value;
    if(inputValue !== ""){
        address.classList.remove("border-red-500");
        addWarnAddres.classList.add("hidden");
    }

})

//Configurcao do botao de finalizar pedido
checkoutBtn.addEventListener('click', (vt)=>{
    const open = checkHoario();
    if(!open){
        Toastify({
            text: "INFELIZMENTE ESTANOS FECAHDOS!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            }
        }).showToast()
        return; //Nao esqueça este return quando usures o Toast
    }
    if(cart.length === 0) return;

    if(address.value === ""){//Nao da espaço entre sos virgulas altas
        addWarnAddres.classList.remove("hidden")
        address.classList.add("border-red-500")
        return;
    }

    //CONFIURACAO PARA ENVIAR O  NOSSO PEDIDO NO WHASUP
    const cartItmesWh = cart.map((e)=>{
        return(
            `${e.nome} Quantidade: (${e.quantidade}) Preço: Ft (${e.price}) |`
        )
    }).join("");
    const message = encodeURIComponent(cartItmesWh);
    const phone = "+36204869457";
    window.open(`https://wa.me/${phone}? text=${message} Endereço: ${address.value}`, "_blank")

    cart.length = 0;//para zerar o carrinho 
    updateCartModal();
})

//Configuracao da nossa tabela de hora quando esta aberto ou fechado
const checkHoario =()=>{
    const data = new Date();
    const hora = data.getHours();
    
    
    return hora >= 18 && hora < 22;
}

const horaio = document.querySelector("#date-span")//Pegando a minha dic onde esta o nosso horario
const iSopen = checkHoario()

if(iSopen){
    horaio.classList.remove("bg-red-500"); //Fazendo a verificacao do horaio se aberto, fica verde, caso esteja fechado fica vermelho
    horaio.classList.add("bg-green-600");
}else{
    horaio.classList.remove("bg-green-600");
    horaio.classList.add("bg-red-500")
}

