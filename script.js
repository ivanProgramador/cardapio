
/*
Pegando os ids dos elementos que serão manipulados  
*/
const menu = document.getElementById("menu");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkOutBtn = document.getElementById("checkout-btn");


const closeModalBtn = document.getElementById("close-modal-btn");

const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");


let cart = [];


//abrindo o modal do carrinho

cartBtn.addEventListener("click",function(){
    //acionado o flex para o modal aparecer 
    cartModal.style = "display:flex"
});

//fechar o modal quando clicar fora 

cartModal.addEventListener("click",function(event){

   //testando se o elemento clicado tem o id do modal  
   if(event.target === cartModal){

     //se não tiver é porque a pessoa clicou fora então ele fecha 
      cartModal.style = "none";
   }
});

//fechar o modal usando o botão 
closeModalBtn.addEventListener("click", function(){
      //acionado o flex para o modal aparecer 
    cartModal.style = "display:none"
    
});

//identificando os itens clicados 

menu.addEventListener("click",function(event){
   
   //Nesse caso ele vai monitorar  elemento que tem essa classe 
   //e todos os elemntos filhos dele é assim que eu vou ter acesso 
   //aos atributos data-name e price que vão ondicar qual eo porduto e o valor do produto
   //que vai para o carrinho

   let parentButon = event.target.closest(".add-to-cart-btn");

   if(parentButon){
      //pegando somente o nome e o preço do produto selecionado 

      const name = parentButon.getAttribute("data-name");
      const price = parseFloat(parentButon.getAttribute("data-price"));

      //então toda vez que botão do carrinho for clicado o valor sera recebido e adicionado no array 
      //pela função addToCart()

      addToCart(name,price);
   }
})


// funcão para adicionar no carrinho 

function addToCart(name,price){

 const existingItem = cart.find(item => item.name === name)

 //se for encontrado então sera adicionado +1 no atributo quantidade isso evita que haja duplidade desnecessaria dentro do carrinho 

  if(existingItem){

    existingItem.quantity += 1;

  
  }else{

   cart.push(
      {
         name,
         price,
         quantity:1,
      }
   )}

   updateCartModal()

 

}

//atualiza o carrinho 

function updateCartModal(){

   //essa e a div que mostra os eleentos no carrinho 

   cartItemsContainer.innerHTML= "";

   let total = 0;
   
   // aqui eu pego todos os dados que tem dentro do array 
   cart.forEach(item => {

      // crio uma div para cada elemento  
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("flex","justify-between","mb-4","flex-col")

      //crio um elementos html para conter os dados de acad um dos elementos
      cartItemElement.innerHTML = `
        <div class="flex items-center justify-between" >
         <div>
           <p class="font-medium" >${item.name}</p>
           <p>Qtd: ${item.quantity}</p>
           <p class="font-medium mt-2" >${item.price.toFixed(2)}</p>
         </div>

         <div>
           <button>
             Remover
           </button>
         </div>
        </div>
      `

      //calculando o total no caso eu estou pegando o vaor do item 
      // e multiplicando epla quantidade de vezes que el foi pedido 
      //somando o valor na varivel total 

      
      total += item.price * item.quantity;
      
      //e adiciona a div para mostrar os dados 
      cartItemsContainer.appendChild(cartItemElement);


   })

   cartTotal.textContent = total.toLocaleString("pt-br",{
      style:"currency",
      currency:"BRL"
   });

   
}







