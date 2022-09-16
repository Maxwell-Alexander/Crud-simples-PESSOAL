let array_banco = JSON.parse(localStorage.getItem('banco_dados')) || []; // 1° -- Criando o "banco de dados".

class Pessoa { // Classe para casdastro.
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade
    }
}

function cadastro() { // 2° -- Recebe os dados input e estancia a Classe Pessoa e inseri no BD.

    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;

    let obj_dados = new Pessoa(nome, idade);

    array_banco.push(obj_dados);

    localStorage.banco_dados = JSON.stringify(array_banco);

}

function excluir(i) { // Exclui através o (i) a linha da tabela no DOM e os dados no local storege.

    let linha_tabela = document.getElementById(`excluir-${i}`).parentNode.parentNode;
    linha_tabela.remove();

    array_banco.splice(i, 1);

    localStorage.banco_dados = JSON.stringify(array_banco);

}

function editar(i) { // Reinsere os dados no input e altera o submit do formulário para chamar outra função.

    document.getElementById("multi_bto").innerHTML = "Salvar"; // Muda nome do button
    document.getElementById("formulario_cadastro").setAttribute("onsubmit", `salvar_edicao(${i})`);

    function insercao_dados() {
        document.getElementById('nome').value = array_banco[i].nome;
        document.getElementById('idade').value = array_banco[i].idade;
    }

    insercao_dados();

}

function salvar_edicao(i) { // Salva no "Banco de dados" os valores alterados no input.

    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;

    let obj_dados = new Pessoa(nome, idade);

    array_banco.splice(i, 1, obj_dados);

    localStorage.banco_dados = JSON.stringify(array_banco);

}

function renderizar() { // Renderiza no DOM os dados do local storege.

    let dados = JSON.parse(localStorage.getItem('banco_dados'));

    let tabela = document.getElementById('corpo_tabela');
    tabela.innerHTML = ''; // Retorna a tabela vazia

    let i = 0;

    while (i < dados.length) {

        let qtd_linhas = tabela.rows.length;
        let linha = tabela.insertRow(qtd_linhas);


        let celula_nome = linha.insertCell(0);
        let celula_idade = linha.insertCell(1);
        let celula_acao = linha.insertCell(2);


        celula_nome.innerHTML = dados[i].nome;
        celula_idade.innerHTML = dados[i].idade;
        celula_acao.innerHTML = `<i class="fa fa-pencil btn-warning" aria-hidden="true" id="editar-${i}" onclick="editar(${i})"></i>
        <i class="fa fa-trash btn-danger" aria-hidden="true"  id="excluir-${i}" onclick="excluir(${i})"></i>`;

        i++;
    }
}


document.addEventListener('DOMContentLoaded', function () { renderizar() }) // Rende


