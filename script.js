import { data } from "./data.js";

console.log(data, "items");

let carrinho = [];

function openCarrinho() {
    const button = document.querySelector(".carrrinhobtn");
    button.addEventListener("click", () => {
      let ulcart = document.querySelector(".cartul");
      if (ulcart) {
        ulcart.remove();
      } else {
        const header = document.querySelector("header");
        ulcart = document.createElement("ul");
        ulcart.classList.add("cartul");
        ulcart.innerHTML = `<li><strong>Produtos no carrinho:</strong></li>`;
        header.appendChild(ulcart);
        atualizarCarrinho();
      }
    });
  }
  

function montarLista() {
    const ulProdutos = document.querySelector(".produtos");
    data.items.forEach((item) => {
      ulProdutos.insertAdjacentHTML("beforeend", `
        <li class="product">
          <img src="${item.product.images[0]}" alt="${item.product.name}" style="width: 25%;">
          <div class="product-info">
            <h3>${item.product.name}</h3>
            <div class="price">
              ${item.product.price.installments}x de R$ ${item.product.price.installmentValue.toFixed(2)}<br>
              ou R$ ${item.product.price.value.toFixed(2)}
            </div>
          </div>
          <button class="add-btn" id="btnadd${item.product.id}">Adicionar ao carrinho</button>
        </li>
      `);
      const btnadd = document.getElementById(`btnadd${item.product.id}`);
      btnadd.addEventListener("click", () => {
        carrinho.push({
          name: item.product.name,
          price: item.product.price.value.toFixed(2),
        });
        atualizarCarrinho();
        atualizarContador();
      });
    });
  }
  
  function atualizarCarrinho() {
    const ulcart = document.querySelector(".cartul");
    if (ulcart) {
      ulcart.innerHTML = "<li><strong>Produtos no carrinho:</strong></li>";
      carrinho.forEach((produto, index) => {
        ulcart.insertAdjacentHTML("beforeend", `
          <li>
            ${produto.name} - R$${produto.price}
            <button class="remover-btn" data-index="${index}" style="margin-left: 10px; color: red;">Remover</button>
          </li>
        `);
      });
  
      document.querySelectorAll(".remover-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = parseInt(e.target.getAttribute("data-index"));
          carrinho.splice(index, 1); // remove o item do carrinho
          atualizarCarrinho();
          atualizarContador();
        });
      });
    }
  }
  
  function atualizarContador() {
    const contador = document.getElementById("contador");
    contador.textContent = carrinho.length;
  }
  
openCarrinho();
montarLista();
function addToCart(name, parcela, precoAVista) {
    carrinho.push({
      name: name,
      price: precoAVista.replace("R$", "").trim()
    });
    atualizarCarrinho();
    atualizarContador();
  }
