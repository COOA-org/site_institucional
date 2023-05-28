var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    //alterar aqui para os parâmetros da tabela 
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(cnpj, desc, nome, telefone, email, rua, bairro, estado, cidade, cep, numero) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj, desc, nome, telefone, email, rua, bairro, estado, cidade, cep, numero);
    //alterar aqui para os parâmetros da tabela 
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoEnd = `INSERT INTO Endereco (lougradouro, bairro, municipio, cep)
    SELECT * FROM (SELECT '${rua}', '${bairro}', '${cidade}', '${cep}') AS tmp
    WHERE NOT EXISTS (
        SELECT cep FROM Endereco WHERE cep = '${cep}'
    ) LIMIT 1;`;
    var instrucao = `
        INSERT INTO Empresa (cnpj, razaoEmpresa, nomeEmpresa, telefone, email, numeroEndereco, fkEndereco) VALUES ('${cnpj}', '${desc}', '${nome}', '${telefone}', '${email}', ${numero}, (SELECT idEndereco FROM Endereco WHERE cep='${cep}'));
    `;
    //sessionStorage.EMPRESA = 
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucaoEnd),database.executar(instrucao);
}
function cadastrarFabrica(nome, telefone, numero, rua, complemento, cep, bairro, cidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, telefone, numero, rua, complemento, cep, bairro, cidade);
    //alterar aqui para os parâmetros da tabela 
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    //////////////////////////////////
    // ALTERAR - COLOCAR LIGAÇÃO COM A CHAVE ESTRANGEIRA DA TABELA ENDEREÇO
    ///////////////////////////////////
    var instrucaoEnd = `INSERT INTO Endereco (lougradouro, bairro, municipio, cep)
    SELECT * FROM (SELECT '${rua}', '${bairro}', '${cidade}', '${cep}') AS tmp
    WHERE NOT EXISTS (
        SELECT cep FROM Endereco WHERE cep = '${cep}'
    ) LIMIT 1;`;
    var instrucao = `
        INSERT INTO Fabrica (nomeFabrica, telefone, fkEndereco, complemento, numeroEndereco) VALUES ('${nome}', '${telefone}', (SELECT idEndereco FROM Endereco WHERE cep = '${cep}'), '${complemento}', '${numero}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao + "\n Executando a instrução: \n" + instrucaoEnd);
    return database.executar(instrucaoEnd),database.executar(instrucao);
}

function cadastrarAdm(nome, senha, email, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAdm():", nome, email, senha, cpf);
    //alterar aqui para os parâmetros da tabela 
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, senha, email, cpf) VALUES ('${nome}', '${senha}', '${email}', '${cpf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrarAdm,
    cadastrarEmpresa,
    cadastrarFabrica,
    listar,
};