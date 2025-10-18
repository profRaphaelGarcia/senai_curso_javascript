let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [];

//Telas
const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");

//Botões
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltarLista = document.querySelector("#btn-voltar-lista");

//Inputs
const inputId = document.querySelector("#user-id");
const inputNome = document.querySelector("#user-nome");
const inputSobrenome = document.querySelector("#user-sobrenome");
const inputEmail = document.querySelector("#user-email");
const inputCep = document.querySelector("#user-cep");
const inputRua = document.querySelector("#user-rua");
const inputNumero = document.querySelector("#user-numero");
const inputComplemento = document.querySelector("#user-complemento");
const inputBairro = document.querySelector("#user-bairro");
const inputCidade = document.querySelector("#user-cidade");
const inputEstado = document.querySelector("#user-estado");
const inputObs = document.querySelector("#user-obs");

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");


function mostrarTelaLista(){
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
    renderizarTabela();
}

function mostrarTelaCadastro(){
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function salvarUsuario(){
    const id = Number(inputId.value);
    const nome = inputNome.value;
    const sobrenome = inputSobrenome.value;
    const email = inputEmail.value;
    const rua = inputRua.value;
    const numero = inputNumero.value;
    const complemento = inputComplemento.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const obs = inputObs.value;

    const usuario = {
        id: id || Date.now(), nome, sobrenome, email, rua, numero, complemento, bairro, cidade, estado, obs
    }

    usuarios.push(usuario);
    salvarNoStorage();
}

function salvarNoStorage(){
    localStorage.setItem("cadastro_usuarios",JSON.stringify(usuarios));
}

function renderizarTabela(){
    tabelaCorpo.innerHTML = "";
    usuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning" data-id="${user.id}">Editar</button>

                <button type="button" class="btn btn-sm btn-danger" data-id="${user.id}">Excluir</button>
            </td>
        `;

        tabelaCorpo.appendChild(tr);
    });

}

function excluirUsuario(id){
    if (confirm("Você deseja realmente excluir esse usuário?")){
        console.log(id);
        usuarios = usuarios.filter(user => user.id !== id);
        salvarNoStorage();
        renderizarTabela();
    }
}

function inicializar(){
    btnAdicionar.addEventListener("click",mostrarTelaCadastro);
    btnVoltarLista.addEventListener("click",mostrarTelaLista);
    form.addEventListener("submit", salvarUsuario);
    mostrarTelaLista();

    tabelaCorpo.addEventListener("click", (event) => {
        const target = event.target.closest("button");
        if(!target) return
        
        const id = Number(target.dataset.id);
        
        if (isNaN(id)) return

        if (target.classList.contains("btn-warning")){
            editarUsuario(id);
        } else if (target.classList.contains("btn-danger")){
            excluirUsuario(id);
        }        
    })
}

inicializar();