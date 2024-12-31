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

cartBtn.addEventListener("click", function () {
  //acionado o flex para o modal aparecer
  cartModal.style = "display:flex";
});

//fechar o modal quando clicar fora

cartModal.addEventListener("click", function (event) {
  //testando se o elemento clicado tem o id do modal
  if (event.target === cartModal) {
    //se não tiver é porque a pessoa clicou fora então ele fecha
    cartModal.style = "none";
  }
});

//fechar o modal usando o botão
closeModalBtn.addEventListener("click", function () {
  //acionado o flex para o modal aparecer
  cartModal.style = "display:none";
});

//identificando os itens clicados

menu.addEventListener("click", function (event) {
  //Nesse caso ele vai monitorar  elemento que tem essa classe
  //e todos os elemntos filhos dele é assim que eu vou ter acesso
  //aos atributos data-name e price que vão ondicar qual eo porduto e o valor do produto
  //que vai para o carrinho

  let parentButon = event.target.closest(".add-to-cart-btn");

  if (parentButon) {
    //pegando somente o nome e o preço do produto selecionado

    const name = parentButon.getAttribute("data-name");
    const price = parseFloat(parentButon.getAttribute("data-price"));

    //então toda vez que botão do carrinho for clicado o valor sera recebido e adicionado no array
    //pela função addToCart()

    addToCart(name, price);
  }
});

// funcão para adicionar no carrinho

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  //se for encontrado então sera adicionado +1 no atributo quantidade isso evita que haja duplidade desnecessaria dentro do carrinho

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

//atualiza o carrinho

function updateCartModal() {
  //essa e a div que mostra os eleentos no carrinho

  cartItemsContainer.innerHTML = "";

  let total = 0;

  // aqui eu pego todos os dados que tem dentro do array
  cart.forEach((item) => {
    // crio uma div para cada elemento
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    //crio um elementos html para conter os dados de acad um dos elementos
    cartItemElement.innerHTML = `
        <div class="flex items-center justify-between" >
         <div>
           <p class="font-medium" >${item.name}</p>
           <p>Qtd: ${item.quantity}</p>
           <p class="font-medium mt-2" >${item.price.toFixed(2)}</p>
         </div>

         <div>
           <button class="remove-from-cart-btn" data-name="${item.name}">
             Remover
           </button>
         </div>
        </div>
      `;

    //calculando o total no caso eu estou pegando o vaor do item
    // e multiplicando epla quantidade de vezes que el foi pedido
    //somando o valor na varivel total

    total += item.price * item.quantity;

    //e adiciona a div para mostrar os dados
    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
}

//pegando o nome do item atraves do click

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    //passando o nome do item para função de remover
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  //busca pelo item
  const index = cart.findIndex((item) => item.name === name);

  // quando a função findIndex não encontra o item ela retorna -1
  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

//checagem de endereço

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

checkOutBtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();

  if (!isOpen) {
    Toastify({
      text: "O restaurante esta fechado",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#ef4444",
      },
    }).showToast();

    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  //mandando pedido para api

  const cartItems = cart
    .map((item) => {
      return `${item.name} Quantidade:(${item.quantity}) Preço: R$ ${item.price}| `;
    })
    .join("");

  const messsage = encodeURIComponent(cartItems);
  const phone = "";

  window.open(
    `https://wa.me/${phone}?text=${messsage} Endereço: ${addressInput.value}`,
    "_blank"
  );

  cart = [];
  updateCartModal();
});

//verficando se o restaurantee esta aberto

function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();

  //aqqui estou dizendo o horario de funcionamento
  //se a hora for maior ou igual a 18 ee menor que 22:00 então
  //a função retorna true e o restaurante esta aberto
  //caso contrario a função retorna false e o restaurante esta fechado

  return hora >= 18 && hora < 22;

  //se retornar true esta aberto
}

//manipulando a view com base no resultado

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}
