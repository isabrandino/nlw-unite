let participantes = [
  {
    nome: "Isadora Brandino",
    email: "isadora@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 20, 20),
    dataCheckIn: new Date(2024, 2, 1, 20, 20),
  },
  {
    nome: "Andre Souza",
    email: "andre@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null,
  },
  // Adicione mais participantes aqui
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 10),
    dataCheckIn: new Date(2024, 0, 15, 10),
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 15),
    dataCheckIn: new Date(2024, 1, 10, 15),
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 18),
    dataCheckIn: new Date(2024, 2, 5, 18),
  },
  {
    nome: "Ana Rodrigues",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 9),
    dataCheckIn: null,
  },
  {
    nome: "Lucas Pereira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 14),
    dataCheckIn: new Date(2024, 1, 25, 14),
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 21),
    dataCheckIn: null,
  },
  {
    nome: "Fernanda Ramos",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 1, 1, 8),
    dataCheckIn: null,
  },
  {
    nome: "Rafaela Almeida",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 19),
    dataCheckIn: new Date(2024, 0, 20, 19),
  },
];

const criarNovoParticipante = (participante) => {
  // cria uma linha na tabela com os dados de cada participante
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
     data-email="${participante.email}"
     onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
    </button>
    `;
  }

  return `
          <tr>
            <td>
              <strong>
              ${participante.nome}
              </strong>
              <br>
              <small>
                ${participante.email}
              </small>
              </td>
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
          </tr>
        `;
};

const AtualizarLista = (participantes) => {
  let output = "";
  //estrutura de repetição - loop
  for (let participante of participantes) {
    // 'andre' = 'andre' + 'dorinha'
    output += criarNovoParticipante(participante);
    // output = output + criarNovoParticipante(participante)
    //faça alguma coisa
  }

  document.querySelector("tbody").innerHTML = output;
};

AtualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  //verificar se o participante ja existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email;
  });

  if (participanteExiste) {
    alert("Email já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  AtualizarLista(participantes);

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmação = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmação) == false) {
    return;
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date();
  //atualizar a lista de participantes
  AtualizarLista(participantes);
};
