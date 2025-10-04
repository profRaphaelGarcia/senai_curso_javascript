
const PRECO_POR_PAGINA = 500;
const PRECO_DESIGN_ADICIONAL = 1000;

//seleciona o objeto pelo nome da classe - por isso o "."
document.querySelector('.seu-nome').textContent = "Raphael Garcia"; 

//seleciona o objetvo pelo id - "#"
const inputPaginas      = document.querySelector("#qtd-paginas");
const inputPrazo        = document.querySelector("#prazo-entrega");
const inputDesconto     = document.querySelector("#desconto");
const checkBoxDesign    = document.querySelector("#inclui-design");

const resumoSubtotal    = document.querySelector("#resumo-subtotal");
const resumoAdicional   = document.querySelector("#resumo-adicional");
const resumoUrgencia    = document.querySelector("#resumo-urgencia");
const resumoDesconto    = document.querySelector("#resumo-desconto");
const resumoTotal       = document.querySelector("#resumo-total");

const calcularSubtotal = (quantidade) => quantidade * PRECO_POR_PAGINA;
const calcularValorDesconto = (valor,porcentagem) => (valor * porcentagem)/100;

function calcularTaxaDeUrgencia(valor, prazo) {
    if (prazo > 0 && prazo < 5) 
        return valor * 0.1;
    else if (prazo >= 5 && prazo < 15) 
        return valor * 0.05;

    return 0;  
}


function atualizarOrcamento () {
    const qtdPaginas            = Number(inputPaginas.value);
    const porcentagemDesconto   = Number(inputDesconto.value);
    const prazo                 = Number(inputPrazo.value);
    const designIncluido        = checkBoxDesign.checked;


    const subtotal              = calcularSubtotal(qtdPaginas);
    const adcionalDesign        = designIncluido ? PRECO_DESIGN_ADICIONAL : 0;
    

}



inputPaginas.addEventListener('blur',atualizarOrcamento);


