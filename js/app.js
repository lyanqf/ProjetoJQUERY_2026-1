let tarefas = []
let tarefaEditandoId = null

function gerarId() {
    return Date.now()
}

function adicionarTarefa(tarefa) {

    tarefas.push(tarefa)

    salvarTarefas()
}

function atualizarTarefa(id, novaTarefa) {

    tarefas = tarefas.map(function (tarefa) {

        if (tarefa.id === id) {
            return novaTarefa
        }

        return tarefa
    })

    salvarTarefas()
}

function removerTarefa(id) {

    tarefas = tarefas.filter(function (tarefa) {

        return tarefa.id !== id
    })

    salvarTarefas()
}

function buscarTarefaPorId(id) {

    return tarefas.find(function (tarefa) {

        return tarefa.id === id
    })
}

function filtrarTarefas(status, prioridade) {

    return tarefas.filter(function (tarefa) {

        let statusValido =
            status === "" ||
            tarefa.status === status

        let prioridadeValida =
            prioridade === "" ||
            tarefa.prioridade === prioridade

        return statusValido && prioridadeValida
    })
}

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    )
}

function carregarTarefas() {

    const tarefasStorage =
        localStorage.getItem("tarefas")

    if (tarefasStorage) {

        tarefas = JSON.parse(tarefasStorage)
    }
}

carregarTarefas()

console.log("Sistema iniciado")
console.log(tarefas)

$("#btn-add-obs").on("click", function(){
    $("#form-tarefa").append('<textarea rows="3"></textarea>')
})