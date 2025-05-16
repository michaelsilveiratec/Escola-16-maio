const API_URL = "https://school-system-spi.onrender.com/api/alunos";

document.getElementById("aluno-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    nome: form.nome.value,
    data_nascimento: form.data_nascimento.value,
    nota_primeiro_semestre: parseFloat(form.nota_primeiro_semestre.value),
    nota_segundo_semestre: parseFloat(form.nota_segundo_semestre.value),
    turma_id: parseInt(form.turma_id.value),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  alert("Aluno cadastrado!");
  console.log(result);
  form.reset();
});

// Função de Listar Alunos
document.getElementById("listar-alunos").addEventListener("click", async () => {
  const res = await fetch(API_URL);
  const alunos = await res.json();

  const container = document.getElementById("alunos-lista");
  container.innerHTML =
    "<h2>Lista de Alunos</h2>" +
    alunos
      .map(
        (a) => `
    <div>
      <strong>${a.nome}</strong> (ID: ${a.id})<br>
      Idade: ${a.idade} | Média: ${a.media_final}<br>
      Nascimento: ${a.data_nascimento} | Turma: ${a.turma_id}<br>
      <button onclick="editarAluno(${a.id})">Editar</button>
      <button onclick="excluirAluno(${a.id})">Excluir</button>
      <hr>
    </div>
  `
      )
      .join("");
});

// Função de Editar Aluno
async function editarAluno(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const aluno = await res.json();

  console.log(aluno.aluno);

  // Preenchendo o formulário de edição
  document.getElementById("aluno-id").value = aluno.aluno.id;
  document.getElementById("update-nome").value = aluno.aluno.nome;
  document.getElementById("update-data_nascimento").value =
    aluno.aluno.data_nascimento;
  document.getElementById("update-nota_primeiro_semestre").value =
    aluno.aluno.nota_primeiro_semestre;
  document.getElementById("update-nota_segundo_semestre").value =
    aluno.aluno.nota_segundo_semestre;
  document.getElementById("update-turma_id").value = aluno.aluno.turma_id;

  // Exibindo o pop-up para edição
  document.getElementById("edit-popup").style.display = "block";
}

// Função de Atualizar Aluno
document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const alunoId = document.getElementById("aluno-id").value;
  const data = {
    nome: form["update-nome"].value,
    data_nascimento: form["update-data_nascimento"].value,
    nota_primeiro_semestre: parseFloat(
      form["update-nota_primeiro_semestre"].value
    ),
    nota_segundo_semestre: parseFloat(
      form["update-nota_segundo_semestre"].value
    ),
    turma_id: parseInt(form["update-turma_id"].value),
  };
  console.log(data);

  const response = await fetch(`${API_URL}/${alunoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  alert("Aluno atualizado com sucesso!");
  console.log(result);
  form.reset();

  // Fechar o pop-up após a atualização
  document.getElementById("edit-popup").style.display = "none";
});

// Função de Excluir Aluno
async function excluirAluno(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  alert("Aluno excluído com sucesso!");
  console.log(result);

  // Atualizar a lista de alunos
  document.getElementById("listar-alunos").click();
}

// Função para fechar o pop-up de edição
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("edit-popup").style.display = "none";
});