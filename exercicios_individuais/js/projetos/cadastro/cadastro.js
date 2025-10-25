let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [];

//Telas
const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");

//Botões
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltarLista = document.querySelector("#btn-voltar-lista");
const btnDownload = document.querySelector("#btn-download");
const btnUpload = document.querySelector("#btn-upload");
const inputUpload = document.querySelector("#input-upload");


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

const inputBusca = document.querySelector("#user-busca");

//modal
const modalDetalhes = document.querySelector("#detalhes-modal");
const modalNome = document.querySelector("#modal-nome");
const modalEmail = document.querySelector("#modal-email");
const modalEndereco = document.querySelector("#modal-endereco-completo");
const modalObservacao = document.querySelector("#modal-obs");

const modalBtnEditar = document.querySelector("#modal-btn-editar");
const modalBtnExcluir = document.querySelector("#modal-btn-excluir");

const modal = new bootstrap.Modal(modalDetalhes);

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");

let idEmEdicao = null;

const btnCEP = document.querySelector("#btn-buscar-cep");

function mostrarTelaLista(){
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
    renderizarTabela();
    form.reset();
}

function mostrarTelaCadastro(){
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function salvarUsuario() {

    const id = Number(inputId.value);
    const nome = inputNome.value;
    const sobrenome = inputSobrenome.value;
    const email = inputEmail.value;
    const cep = inputCep.value;
    const rua = inputRua.value;
    const numero = inputNumero.value;
    const complemento = inputComplemento.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const obs = inputObs.value;

    const usuario = {

        // Caso não exista o id, joga o date.now()
        id: id || Date.now(), nome, sobrenome, email, cep, rua, numero, complemento, bairro, cidade, estado, obs
    }


    if (idEmEdicao) {
        const index = usuarios.findIndex(user => user.id === idEmEdicao);
        if (index != -1)  //localizou algo
            usuarios[index] = usuario;
    }
    else    
        usuarios.push(usuario);

    salvarNoStorage();
    form.reset(); //limpa o formulário
    mostrarTelaLista;
}

function salvarNoStorage(){
    localStorage.setItem("cadastro_usuarios",JSON.stringify(usuarios));
}

//se usuariosFiltrados == null, vai carregar todos usuarios para usuariosFiltrados
//se usuariosFiltrados vier registro, mostra os valores
function renderizarTabela(usuariosFiltrados = usuarios) {
    tabelaCorpo.innerHTML = "";
    usuariosFiltrados.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning" data-id="${user.id}">Editar</button>
                <button type="button" class="btn btn-sm btn-danger" data-id="${user.id}">Excluir</button>
                <button type="button" class="btn btn-sm btn-primary" data-id="${user.id}">Mostrar Detalhes</button>


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

function editarUsuario(id) {
    const usuario = usuarios.find(user => user.id === id);

    if (!usuario) 
        return;

    idEmEdicao = id;

    inputId.value = usuario.id;
    inputNome.value = usuario.nome;
    inputSobrenome.value = usuario.sobrenome;
    inputEmail.value = usuario.email;
    inputCep.value = usuario.cep;
    inputRua.value = usuario.rua;
    inputNumero.value = usuario.numero;
    inputComplemento.value = usuario.complemento;
    inputBairro.value  = usuario.bairro;
    inputCidade.value = usuario.cidade;
    inputEstado.value = usuario.estado;
    inputObs.value = usuario.obs;

    mostrarTelaCadastro();

}

async function buscarCEP() {
    const cep = inputCep.value.replace(/\D/g,""); //expressão regular - filtra apenas por número

    if (cep.length === 8) {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        const dados = await resposta.json();     
        console.log(dados);

        if (!dados.erro) {
            inputCep.value = dados.cep;
            inputRua.value = dados.logradouro;
            inputComplemento.value = dados.complemento;
            inputBairro.value = dados.bairro;
            inputCidade.value = dados.localidade;
            inputEstado.value = dados.estado;
        }
        else   
            alert("CEP inválido. Verifique o numero e tente novamente!");


    }
    else 
        alert("Verifique a quantidade de números digitados!");

}

function buscarUsuario () {

    const conteudo = inputBusca.value.toLowerCase().trim();
    console.log(conteudo);

    if (!conteudo) {
        renderizarTabela();
        return;
    }

    usuariosFiltrados = usuarios.filter(user => {
        return  user.nome.toLowerCase().trim().includes(conteudo) || 
                user.sobrenome.toLowerCase().trim().includes(conteudo) || 
                user.email.toLowerCase().trim().includes(conteudo);
    });          
    renderizarTabela(usuariosFiltrados);
    console.log(usuariosFiltrados);
}

function downloadArquivo () {
    const dados = JSON.stringify(usuarios);
    const arquivo = new Blob([dados], {type: "application/json"});
    const url = URL.createObjectURL(arquivo);
    const linkDownload = document.createElement("a");
    linkDownload.href = url;
    linkDownload.download = "usuarios.json"; //nome do arquivo
    linkDownload.click();
    URL.revokeObjectURL(url);

}

function uploadArquivo (evento) {
    const arquivo = evento.target.files[0];
    
    if (!arquivo)
        return;

    const leitor = new FileReader();
        
    leitor.onload = function(evento2) {
        
        const conteudoArquivo = evento2.target.result;
        const usuariosImportados = JSON.parse(conteudoArquivo);

        if (!Array.isArray(usuariosImportados)) {
            alert("O arquivo não é um array válido!");
            return;
        }

        if (confirm("Deseja realmente substituir as informações dos usuários?")) {
            usuarios = usuariosImportados;
            salvarNoStorage();
            renderizarTabela();
            alert("Os usuários foram importados com sucesso!");
            inputUpload.value = "";
            //location.reload(true);

        }

    }   

    leitor.readAsText(arquivo);

    
}

function mostrarDetalhesUsuario(id) {
    const user = usuarios.find(usuario => usuario.id === id);

    if (!user)
        return;

    modalNome.textContent = `${user.nome} ${user.sobrenome}`;
    modalEmail.textContent = user.email;

    //.join vai converter o array em texto e colocar um espaço para separar cada elemento
    const endereco = [user.rua, user.numero, user.bairro, user.complemento, user.cidade, user.estado, user.cep].filter(Boolean).join(", ");
    modalEndereco.textContent = endereco;
    modalObservacao.textContent = user.obs;

    modalBtnEditar.dataset.id = user.id;
    modalBtnExcluir.dataset.id = user.id;

    modal.show();
}


function inicializar() {
    btnAdicionar.addEventListener("click",mostrarTelaCadastro);
    btnVoltarLista.addEventListener("click",mostrarTelaLista);
    btnCEP.addEventListener("click",buscarCEP);

    inputBusca.addEventListener('input',buscarUsuario);

    btnDownload.addEventListener('click', downloadArquivo)
    btnUpload.addEventListener('click', () => inputUpload.click());
    inputUpload.addEventListener("change", uploadArquivo);

    form.addEventListener("submit", salvarUsuario);
    mostrarTelaLista();

    tabelaCorpo.addEventListener("click", (event) => {
        const target = event.target.closest("button");
        if(!target) return;
        
        const id = Number(target.dataset.id);
        
        if (isNaN(id)) return;

        if (target.classList.contains("btn-warning"))
            editarUsuario(id);
        else if (target.classList.contains("btn-danger"))
            excluirUsuario(id);
        else if (target.classList.contains("btn-primary"))
            mostrarDetalhesUsuario(id);
               
    })


    modalDetalhes.addEventListener("click", (event) => {
        const target = event.target.closest("button");
        if(!target) return;
        
        const id = Number(target.dataset.id);
        
        if (isNaN(id)) return;

        if (target.classList.contains("btn-warning")) 
            editarUsuario(id);
        else if (target.classList.contains("btn-danger"))
            excluirUsuario(id);

        modal.hide();

               
    })





}

inicializar();