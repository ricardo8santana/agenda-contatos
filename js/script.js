const exibeContato = () => {
    const tabela = document.getElementById('idTabelaContatos') //pega a tabela
    const tbody = tabela.querySelector('tbody') //pega o corpo

    tbody.innerHTML =
        `<tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Email</th>
            <th>Editar</th>
            <th>Excluir</th>
        </tr>`

    const contatos = JSON.parse(localStorage.getItem('contatos')) || []

    contatos.forEach((contato, index) => {
        
    const conteudoContato =
    ` <tr>
        <td>${contato.nome}</td>
        <td>${contato.email}</td>
        <td>${contato.telefone}</td>  
        <td><button class="btnEditar" onclick="editarContato(${index})"><i class="fa fa-edit"></i></button></td>
        <td><button class="btnExcluir" onclick="deletaContato(${index})"><i class="fa fa-trash"></i></button></td>
    </tr>`
        const row = tbody.insertRow()
        row.innerHTML = conteudoContato
        
    })

}

const addContato = (event) => {
     event.preventDefault()
    let form = document.getElementById('idContatoForm')
    let nome = document.getElementById('idNome').value.trim()
    let sobrenome = document.getElementById('idSobrenome').value.trim()
    let telefone = document.getElementById('idTel').value.trim()
    let tipoTel = document.getElementById('idTelTipo').value
    let email = document.getElementById('idEmail').value.trim()
    let camposVazios = []

   if(nome == ""){
    camposVazios.push("Nome")
   }
   if(sobrenome == ""){
    camposVazios.push("Sobrenome")
   }

   telefone == "" ? camposVazios.push("Telefone") : ''
   tipoTel == "" ? camposVazios.push("Tipo de telefone") : ''
   email == "" ? camposVazios.push("Email") : ''

    if (nome == "" || sobrenome == ""  || telefone == "" || tipoTel == "" || email == ""){
        alert ("Preencha todos os campos!" + camposVazios)

}else{

    const contato = {  //criando um objeto para armazenar os dados
        nome: nome,
        sobrenome: sobrenome,
        telefone: telefone,
        tipoTel: tipoTel,
        email: email

    }
    // buscar os contatos já salvos ou criar um array vazio
    let contatos = JSON.parse(localStorage.getItem('contatos')) || []

    contatos.push(contato) // adiciona um novo Contato dentro da lista Contatos
    localStorage.setItem('contatos', JSON.stringify(contatos))

    form.reset()
    exibeContato()
}

}
//função para cancelar e limpar o formulario
const cancelaForm =(event) => {
    event.preventDefault()//impede o comportamento de botão, enviar o formulario
    document.getElementById('idContatoForm').reset() // limpa o formulario

}
//pega lista de contatos
const deletaContato = (index) => {
    contatos = JSON.parse(localStorage.getItem('contatos')) || []
    //remove o item da lista CONTATOS pelo index, o numero 1 significa que ele deve remover
    //apenas 1 elemento da lista

    contatos.splice(index, 1)
    localStorage.setItem('contatos', JSON.stringify(contatos))
    exibeContato()
}
 const editarContato = (index) => {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || []
    const contato = contatos[index]

    document.getElementById('idNome').value = contato.nome
    document.getElementById('idSobrenome').value = contato.sobrenome
    document.getElementById('idTel').value = contato.telefone
    document.getElementById('idTelTipo').value = contato.telTipo
    document.getElementById('idEmail').value = contato.email

    const atualizaContato = (event) => {
        event.preventDefault()

        contato.nome = document.getElementById('idNome').value.trim()
        contato.sobrenome = document.getElementById('idSobrenome').value.trim()
        contato.telefone = document.getElementById('idTel').value.trim()
        contato.telTipo = document.getElementById('idTelTipo').value.trim()
        contato.email = document.getElementById('idEmail').value.trim()

        const upContato = JSON.stringify(contatos)
        localStorage.setItem('contatos', upContato)

        exibeContato()
        document.getElementById('idContatoForm').reset();

        document.querySelector('.btnSalvar').removeEventListener('click', atualizaContato)
        document.querySelector('.btnSalvar').addEventListener('click', addContato)
    }

    document.querySelector('.btnSalvar').removeEventListener('click', addContato)
    document.querySelector('.btnSalvar').addEventListener('click', atualizaContato)
    
 }

  const buscaContato = () => {
    const barraPesquisa = document.getElementById('idPesquisa').value.trim().toLowerCase()
    const tabela = document.getElementById('idTabelaContatos')
    const linhas = tabela.getElementsByTagName('tr')
    const quantidadeLinhas = linhas.length

    for (let i = 1; i < quantidadeLinhas; i++){
        const celulas = linhas[i].getElementsByTagName('tr')
        const quantidadeCelulas = celulas.length
        let busca = false
        
        for (let j = 0; j < quantidadeCelulas; j++){
            const textCelulas = celulas[j].textContent.toLocaleLowerCase()
            if(textCelulas.includes(barraPesquisa)){
                busca = true
                break
            }
        }
        busca ? linhas[i].style.display = '' : linhas[i].style.display = 'nome'
    }

  }

//função que vai inicializar a aplicação
const init = () => {
document.querySelector('.btnSalvar').addEventListener('click', addContato)
document.querySelector('.btnCancelar').addEventListener('click', cancelaForm)
document.getElementById('idPesquisa').addEventListener('input', buscaContato)
exibeContato()

}
init()

