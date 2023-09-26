//Atualização da página
function atualizar() {
  console.log("click atualizar");
  window.location.href = "index.html";
}
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = "http://127.0.0.1:5000/produtos";
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("myTableBody").innerHTML = "";
      data.produtos.forEach((item) =>
        insertList(item.id, item.produto, item.tamanho, item.quantidade)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList();
/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputSize, inputQuantity) => {
  const formData = new FormData();
  formData.append("produto", inputProduct);
  formData.append("tamanho", inputSize);
  formData.append("quantidade", inputQuantity);
  console.log(formData);
  let url = "http://127.0.0.1:5000/produto";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => response.json()) //converte resposta para json
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
};
/*
  --------------------------------------------------------------------------------------
  Função para CRIAR um BOTÃO CLOSE para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  span.className = "close";
  // Adicione o ícone de fechar do Font Awesome
  span.innerHTML = '<i class="fa fa-times"></i>';
  parent.appendChild(span);
};
/*
  --------------------------------------------------------------------------------------
  Função para REMOVER um item da lista de acordo com o click no BOTÃO CLOSE
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  var table = document.getElementById("myTableBody");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idItem = div.getElementsByTagName("td")[0].innerHTML;

      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(idItem);
        alert("Removido!");
      }
    };
  }
};
/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (id) => {
  let url = "http://127.0.0.1:5000/produto?id=" + id;
  fetch(url, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com produto, tamanho e quantidade 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputProduct = document.getElementById("newInput").value;
  let inputSize = document.getElementById("newSize").value;
  let inputQuantity = document.getElementById("newQuantity").value;

  if (inputProduct === "") {
    alert("Adicione um item!");
  } else if (isNaN(inputQuantity)) {
    alert("Quantidade precisa ser número!");
  } else {
    postItem(inputProduct, inputSize, inputQuantity);
    // insertList(id, inputProduct, inputSize, inputQuantity);
    alert("Item adicionado com sucesso!");
    atualizar();
  }
};
/*
  --------------------------------------------------------------------------------------
  Função para CRIAR um BOTÃO DE EDIÇÃO para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertEditButton = (parent, idProduct) => {
  let editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  let icon = document.createElement("i"); // Cria o ícone de lápis
  icon.className = "fa fa-pencil";
  editBtn.onclick = function () { // Define a função onclick para o botão
    openEditModal();
    editItem(idProduct);
  };
  editBtn.appendChild(icon);  // Adiciona o ícone ao botão
  parent.appendChild(editBtn);
};
/*
  --------------------------------------------------------------------------------------
  Função para abrir o modal de edição
  --------------------------------------------------------------------------------------
*/
const openEditModal = () => {
  const editModal = document.getElementById("editModal");
  editModal.style.display = "block";
};
/*
  --------------------------------------------------------------------------------------
  Função para fechar o modal de edição
  --------------------------------------------------------------------------------------
*/
const closeEditModal = () => {
  const editModal = document.getElementById("editModal");
  editModal.style.display = "none";
};
// Obtém o elemento que fecha o modal
var span = document.getElementById("editModal");

// Quando o usuário clica no elemento (x), fecha o modal
span.onclick = function () {
  var modal = document.getElementById("editModal");
  modal.style.display = "none";
};

// Quando o usuário clica em qualquer lugar fora do modal, fecha-o
window.addEventListener("click", function (event) {
  var modal = document.getElementById("editModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
/*
  --------------------------------------------------------------------------------------
  Função para editar um item existente
  --------------------------------------------------------------------------------------
*/
const editItem = (idProduct) => {
  const table = document.getElementById("myTableBody");
  const rows = table.getElementsByTagName("tr");
  let selectedRow = null;
  console.log(table);
  
  for (let i = 0; i < rows.length; i++) {
    const productIdCell = rows[i].getElementsByTagName("td")[0];
    const cellText = productIdCell.textContent.trim();
    // console.log('Row ' + i + ': ' + cellText);

    // Verifica se o texto da célula corresponde ao idProduct
    if (cellText === idProduct.toString()) {
      selectedRow = rows[i];
      break;
    }
  }
  if (selectedRow) {

    // Obtém as informações do item
    const nameProductCell = selectedRow.getElementsByTagName("td")[1];
    const sizeCell = selectedRow.getElementsByTagName("td")[2];
    const quantityCell = selectedRow.getElementsByTagName("td")[3];

    // Obtém os textos das células e armazena em variáveis separadas
    const nameProduct = nameProductCell.textContent;
    const size = sizeCell.textContent;
    const quantity = quantityCell.textContent;

    // Variáveis para entrada dos dados
    const editProductNameInput = document.getElementById("editProductName");
    const editSizeInput = document.getElementById("editSize");
    const editQuantityInput = document.getElementById("editQuantity");

    // Evitar a propagação do evento de clique nos campos de edição
    editProductNameInput.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    editSizeInput.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    editQuantityInput.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    // Preenche os campos de entrada com os valores obtidos
    editProductNameInput.value = nameProduct;
    editSizeInput.value = size;
    editQuantityInput.value = quantity;
    idx = idProduct;

  }
};
let idx;
/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item no servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const updateItem = (id, nameProduct, newSize, newQuantity) => {
  const formData = new FormData();
  formData.append("produto", nameProduct);
  formData.append("tamanho", newSize);
  formData.append("quantidade", newQuantity);
  for (let pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  let url = "http://127.0.0.1:5000/produto?id=" + id;
  fetch(url, {
    method: "put",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      closeEditModal();
      getList(); // Fecha o modal de edição após a atualização
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
/*
  --------------------------------------------------------------------------------------
  Função para salvar as alterações no modal de edição
  --------------------------------------------------------------------------------------
*/
const saveEditChanges = () => {
  const editProductNameInput = document.getElementById("editProductName");
  const editSizeInput = document.getElementById("editSize");
  const editQuantityInput = document.getElementById("editQuantity");

  const nameProduct = editProductNameInput.value;
  const newSize = editSizeInput.value;
  const newQuantity = editQuantityInput.value;

  if (nameProduct === "") {
    alert("Nome do produto não pode estar vazio!");
    return;
  }
  if (isNaN(newQuantity)) {
    alert("Quantidade precisa ser um número!");
    return;
  }
  updateItem(idx, nameProduct, newSize, newQuantity);
};
/*
  --------------------------------------------------------------------------------------
  Função para inserir itens na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, nameProduct, Size, quantity) => {
  var item = [id, nameProduct, Size, quantity];
  var table = document.getElementById("myTableBody");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertEditButton(row.insertCell(-1), id);
  insertButton(row.insertCell(-1));
  document.getElementById("newInput").value = "";
  document.getElementById("newSize").value = "";
  document.getElementById("newQuantity").value = "";

  removeElement();
};
document.getElementById("export").addEventListener("click", function () {
  /* Create worksheet from HTML DOM TABLE */
  var wb = XLSX.utils.table_to_book(document.getElementById("myTableBody"));
  /* Export to file (start a download) */
  XLSX.writeFile(wb, "Enxoval do bebê.xlsx");
});
