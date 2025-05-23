const API_URL_PROFESSOR = "https://school-system-spi.onrender.com/api/professores";

// Cadastrar Professor
document.getElementById("professor-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    nome: form.nome.value,
    materia: form.materia.value,
    observacoes: form.observacao.value,
    idade: parseInt(form.idade.value),
  };

  try {
    const res = await fetch(API_URL_PROFESSOR, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao cadastrar professor.");

    alert("Professor cadastrado com sucesso!");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar professor.");
  }
});

// Listar Professores
document.getElementById("listar-professores").addEventListener("click", async () => {
  try {
    const res = await fetch(API_URL_PROFESSOR);
    const professores = await res.json();

    const container = document.getElementById("professores-lista");
    container.innerHTML = "<h2>Lista de Professores</h2>";

    professores.forEach((p) => {
      container.innerHTML += `
        <div class="card-professor">
          <div class="prof-nome">${p.nome}
            <span class="prof-id">ID: ${p.id}</span>
          </div>
          <div class="prof-materia">Matéria: ${p.materia ?? ""}</div>
          ${p.observacoes && p.observacoes !== "null" ? `<div class="prof-observacao">Observação: ${p.observacoes}</div>` : ""}
          <div class="prof-idade">Idade: ${p.idade}</div>
          <button onclick="editarProfessor(${p.id})">Editar</button>
          <button onclick="excluirProfessor(${p.id})">Excluir</button>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao listar professores.");
  }
});

// Editar Professor
window.editarProfessor = async function (id) {
  try {
    const res = await fetch(`${API_URL_PROFESSOR}/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar professor.");

    const professor = await res.json();

    document.getElementById("professor-id").value = professor.id;
    document.getElementById("update-nome").value = professor.nome;
    document.getElementById("update-materia").value = professor.materia;
    document.getElementById("update-observacao").value = professor.observacoes;
    document.getElementById("update-idade").value = professor.idade;

    document.getElementById("edit-popup").style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar dados do professor.");
  }
};

// Atualizar Professor
document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const professorId = document.getElementById("professor-id").value;

  const data = {
    nome: document.getElementById("update-nome").value.trim(),
    materia: document.getElementById("update-materia").value.trim(),
    observacoes: document.getElementById("update-observacao").value.trim(),
    idade: parseInt(document.getElementById("update-idade").value),
  };

  try {
    const res = await fetch(`${API_URL_PROFESSOR}/${professorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao atualizar professor.");

    alert("Professor atualizado com sucesso!");
    document.getElementById("edit-popup").style.display = "none";
    document.getElementById("listar-professores").click();
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar professor.");
  }
});

// Excluir Professor
window.excluirProfessor = async function (id) {
  const confirmar = confirm("Tem certeza que deseja excluir este professor?");
  if (!confirmar) return;

  try {
    const res = await fetch(`${API_URL_PROFESSOR}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao excluir professor.");

    alert("Professor excluído com sucesso!");
    document.getElementById("listar-professores").click();
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir professor.");
  }
};

// Fechar popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("edit-popup").style.display = "none";
});