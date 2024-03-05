'use strict'

const container_tarefa = document.getElementById('container_tarefa')

async function validarTarefas() {
    const listUsers = await pegarUsuarios()

    listUsers.forEach(async user => {

        if(user.id != localStorage.getItem('IdUsuario') && user.premium == true) {

            const tarefaContainer = document.createElement('div');
            tarefaContainer.classList.add('tarefa');
    
            const infoPerfil = document.createElement('div');
            infoPerfil.classList.add('info_perfil');
    
            const imagemPerfil = document.createElement('img');
            imagemPerfil.src = "../img/image 34.png";
            imagemPerfil.alt = "";
    
            const tituloTarefa = document.createElement('h1');
            tituloTarefa.textContent = `Tarefas de ${user.nome}`;
    
            infoPerfil.appendChild(imagemPerfil);
            infoPerfil.appendChild(tituloTarefa);
    
            const quantidadeTarefas = document.createElement('h2');
            quantidadeTarefas.textContent = `Possui: ${await contagemTarefas(user.id)}`;
    
            tarefaContainer.appendChild(infoPerfil);
            tarefaContainer.appendChild(quantidadeTarefas);
    
            container_tarefa.appendChild(tarefaContainer);
    
            const linhaRoxa = document.createElement('div');
            linhaRoxa.classList.add('linha_roxa');
            container_tarefa.appendChild(linhaRoxa);

            tarefaContainer.addEventListener('click', function(){

                localStorage.setItem('NomeUsuarioTarefa', user.nome)
                localStorage.setItem('IdUsuarioTarefa', user.id)

                window.location.href = '../perfil_visitado/perfil.html'
            })
        }
    });
}

async function contagemTarefas(idUsuario) {
    let contagem_tarefas = 0;
    const listTasks = await pegarTarefas()
    listTasks.forEach(task => {
        if(task.idUsuario == idUsuario) {
            contagem_tarefas++;
        }
    });
    return contagem_tarefas;
}

async function pegarTarefas() {
    const endpoint = 'http://localhost:5080/tarefas';
    const userApi = await fetch(endpoint);
    const listTasks = await userApi.json();
    return listTasks;
}

async function pegarUsuarios() {
    const endpoint = 'http://localhost:5080/usuario';
    const userApi = await fetch(endpoint);
    const listUsers = await userApi.json();
    return listUsers;
}

validarTarefas()

var divCriarTarefa = document.getElementById('criar_tarefa');

divCriarTarefa.addEventListener('click', function() {
    displayCriar();
});

async function displayCriar() {
    console.log('Função displayCriar chamada.');

    const tarefaId = "ID_DA_TAREFA"; // Substitua pelo ID real
    const tarefaDescricao = "DESCRIÇÃO_DA_TAREFA"; // Substitua pela descrição real

    const fundoTransparente = document.getElementById('fundo_transparente');
    fundoTransparente.classList.add('fundoPreto_transparente');

    // Criação da div principal
    const divComentarios = document.createElement('div');
    divComentarios.classList.add('comentarios');

    // Clonagem da div existente no HTML (a div com id 'fundo_transparente')
    const divExistente = document.getElementById('fundo_transparente').cloneNode(true);

    // Remoção do id da div clonada para evitar duplicação de IDs no DOM
    divExistente.removeAttribute('id');

    // Modificação do conteúdo do h3 para 'COMENTANDO'
    divExistente.querySelector('h3').textContent = "CRIANDO";

    // Modificação do conteúdo do p para a descrição da tarefa
    divExistente.querySelector('.tarefa_comentando .texto_comentando').textContent = tarefaDescricao;

    // Modificação do conteúdo do segundo p para a quantidade de comentários
    divExistente.querySelector('.tarefa_comentando p:nth-child(2)').textContent = 'Qtd comentarios: ' + await contagemComentarios(tarefaId);

    // Adição do evento de clique ao botão 'sair'
    divExistente.querySelector('.titulo span').addEventListener('click', function() {
        fundoTransparente.classList.remove('fundoPreto_transparente');
        fundoTransparente.innerHTML = '';
    });

    // Adição da div clonada ao divComentarios
    divComentarios.appendChild(divExistente);

    // Adição do divComentarios ao DOM
    fundoTransparente.innerHTML = ''; // Limpa qualquer conteúdo existente
    fundoTransparente.appendChild(divComentarios);

    // Adicione outros eventos e personalizações conforme necessário.
}



