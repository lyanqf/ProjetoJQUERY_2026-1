$(document).ready(function () {

    carregarTarefas()

    renderizarTabela(tarefas)

    $("#btn-add-obs").on("click", function () {

        if ($("#tarefa-obs").length === 0) {

            $("#container-obs").append(`

                <div class="form-group">

                    <label for="tarefa-obs">
                        Observação
                    </label>

                    <textarea id="tarefa-obs"></textarea>

                </div>

            `)
        }
    })

    $("#form-tarefa").on("submit", function (e) {

        e.preventDefault()

        const titulo =
            $("#tarefa-titulo").val()

        const descricao =
            $("#tarefa-desc").val()

        const prioridade =
            $("#tarefa-prioridade").val()

        const data =
            $("#tarefa-data").val()

        const status =
            $("#tarefa-status").val()

        const observacao =
            $("#tarefa-obs").val()

        if (titulo.trim() === "") {

            $("#msg-erro")
                .removeClass("escondido")

            return
        }

        $("#msg-erro")
            .addClass("escondido")

        const tarefa = {

            id: gerarId(),

            titulo: titulo,

            descricao: descricao,

            prioridade: prioridade,

            data: data,

            status: status,

            observacao: observacao
        }

        adicionarTarefa(tarefa)

        renderizarTabela(tarefas)

        $("#form-tarefa")[0].reset()

        $("#container-obs").html("")

        console.log(tarefas)
    })

    $(document).on(
        "click",
        ".btn-excluir",
        function () {

            const id =
                Number($(this).data("id"))

            removerTarefa(id)

            renderizarTabela(tarefas)
        }
    )
})

function renderizarTabela(lista) {

    if (lista.length === 0) {

        $("#area-tabela").html("")

        return
    }

    let html = `

        <hr>

        <h2>Lista de Tarefas</h2>

        <div class="filtros">

            <select id="filtro-status">

                <option value="">
                    Todos os Status
                </option>

                <option value="Pendente">
                    Pendente
                </option>

                <option value="Concluída">
                    Concluída
                </option>

            </select>

            <select id="filtro-prioridade">

                <option value="">
                    Todas as Prioridades
                </option>

                <option value="Baixa">
                    Baixa
                </option>

                <option value="Média">
                    Média
                </option>

                <option value="Alta">
                    Alta
                </option>

            </select>

            <button
                type="button"
                id="btn-filtrar">

                Filtrar

            </button>

        </div>

        <div id="tabela-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Prioridade</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Observação</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>
    `

    lista.forEach(function (tarefa) {

        let classeLinha = ""

        if (tarefa.status === "Concluída") {

            classeLinha = "linha-concluida"
        }

        html += `

            <tr
                class="${classeLinha}"
                data-id="${tarefa.id}">

                <td>${tarefa.titulo}</td>

                <td>${tarefa.descricao}</td>

                <td>${tarefa.prioridade}</td>

                <td>${tarefa.data}</td>

                <td>${tarefa.status}</td>

                <td>${tarefa.observacao || ""}</td>

                <td>

                    <button
                        type="button"
                        class="btn-editar"
                        data-id="${tarefa.id}">

                        Editar

                    </button>

                    <button
                        type="button"
                        class="btn-excluir"
                        data-id="${tarefa.id}">

                        Excluir

                    </button>

                </td>

            </tr>
        `
    })

    html += `

                </tbody>

            </table>

        </div>
    `

    $("#area-tabela").html(html)
}