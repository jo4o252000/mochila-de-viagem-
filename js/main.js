const form = document.getElementById("novoItem")
const lista  = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem('itens')) || [] //vai verificar no local storage se já existe itens salvos

itens.forEach((element) => {
    lista.innerHTML += ` <li class="item"><strong>${element.quantidade}</strong>${element.nome}</li>`
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const nomeItem = form["nome"].value
    const quantidade = form["quantidade"].value

    const existe = itens.find(element => element.nome === nomeItem)
    console.log(existe)

    const itemAtual = {
        "nome":nomeItem,
        "quantidade": quantidade
    }

    if(existe){
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        criaElemento(itemAtual)
        //inserindo o objeto dentro de um array 
        itens.push(itemAtual)
    }
    //local storage só recebe string 
    localStorage.setItem("itens", JSON.stringify(itens))//transformando json em string

    form["nome"].value = ""
    form["quantidade"].value = ""
})

function criaElemento(item){
    const novoItem = document.createElement('li') //criando o elemento li

    novoItem.classList.add("item") //adicionando uma class name 

    const numeroItem  = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

    // só isso já funciona para adicionar um novo elemento na lista
    // lista.innerHTML += ` <li class="item"><strong>${quantidade}</strong>${nome}</li>`
}

function atualizaElemento(item){
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    
}