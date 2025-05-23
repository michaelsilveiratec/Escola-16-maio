const API_URL = "https://school-system-spi.onrender.com/api/alunos";

// Cadastrar Aluno
document.getElementById("aluno-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    nome: form.nome.value.trim(),
    data_nascimento: form.data_nascimento.value,
    nota_primeiro_semestre: parseFloat(form.nota_primeiro_semestre.value),
    nota_segundo_semestre: parseFloat(form.nota_segundo_semestre.value),
    turma_id: parseInt(form.turma_id.value),
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao cadastrar aluno.");

    alert("Aluno cadastrado com sucesso!");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar aluno.");
  }
});

// Listar Alunos
document.getElementById("listar-alunos").addEventListener("click", async () => {
  try {
    const res = await fetch(API_URL);
    const alunos = await res.json();

    const container = document.getElementById("alunos-lista");
    container.innerHTML = "<h2>Lista de Alunos</h2>";

    alunos.forEach((a) => {
      container.innerHTML += `
        <div class="card-aluno">
          <div class="aluno-nome">${a.nome}
            <span class="aluno-id">ID: ${a.id}</span>
          </div>
          <div class="aluno-idade">Idade: ${a.idade}</div>
          <div class="aluno-media">Média: ${a.media_final ?? ""}</div>
          ${a.data_nascimento && a.data_nascimento !== "null" ? `<div class="aluno-nascimento">Nascimento: ${a.data_nascimento}</div>` : ""}
          ${a.turma_id != null && a.turma_id !== 0 ? `<div class="aluno-turma">Turma: ${a.turma_id}</div>` : ""}
          <button onclick="editarAluno(${a.id})">Editar</button>
          <button onclick="excluirAluno(${a.id})">Excluir</button>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar lista de alunos.");
  }
});

// Editar Aluno - Versão Corrigida
window.editarAluno = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao buscar aluno.");
    }

    const aluno = await res.json();

    // Verifica se a data de nascimento está no formato correto
    let dataNascimento = aluno.data_nascimento;
    if (dataNascimento && !dataNascimento.includes('T')) {
      // Remove o fuso horário se existir
      dataNascimento = dataNascimento.split('T')[0];
    }

    // Preenche o formulário de edição
    document.getElementById("aluno-id").value = aluno.id;
    document.getElementById("update-nome").value = aluno.nome || '';
    document.getElementById("update-data_nascimento").value = dataNascimento || '';
    document.getElementById("update-nota_primeiro_semestre").value = aluno.nota_primeiro_semestre || '';
    document.getElementById("update-nota_segundo_semestre").value = aluno.nota_segundo_semestre || '';
    document.getElementById("update-turma_id").value = aluno.turma_id || '';

    // Mostra o popup de edição
    document.getElementById("edit-popup").style.display = "block";
  } catch (err) {
    console.error("Detalhes do erro:", err);
    alert(`Erro ao carregar dados do aluno: ${err.message}`);
  }
};

// Atualizar Aluno
document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const alunoId = document.getElementById("aluno-id").value;

  const data = {
    nome: document.getElementById("update-nome").value.trim(),
    data_nascimento: document.getElementById("update-data_nascimento").value,
    nota_primeiro_semestre: parseFloat(document.getElementById("update-nota_primeiro_semestre").value),
    nota_segundo_semestre: parseFloat(document.getElementById("update-nota_segundo_semestre").value),
    turma_id: parseInt(document.getElementById("update-turma_id").value),
  };

  try {
    const res = await fetch(`${API_URL}/${alunoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao atualizar aluno.");

    alert("Aluno atualizado com sucesso!");
    document.getElementById("edit-popup").style.display = "none";
    document.getElementById("listar-alunos").click();
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar aluno.");
  }
});

// Excluir Aluno
window.excluirAluno = async function (id) {
  const confirmar = confirm("Tem certeza que deseja excluir este aluno?");
  if (!confirmar) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao excluir aluno.");

    alert("Aluno excluído com sucesso!");
    document.getElementById("listar-alunos").click();
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir aluno.");
  }
};

// Fechar popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("edit-popup").style.display = "none";
});

