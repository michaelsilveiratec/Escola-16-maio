const API_URL_TURMA = "https://school-system-spi.onrender.com/api/turmas";

document.getElementById("turma-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    nome: form.nome.value,
    materia: form.materia.value,
    descricao: form.descricao.value,
    ativo: form.ativo.value === "true",
    professor_id: parseInt(form.professor_id.value),
  };

  const response = await fetch(API_URL_TURMA, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  alert("Turma cadastrada!");
  console.log(result);
  form.reset();
});

document.getElementById("listar-turmas").addEventListener("click", async () => {
  const res = await fetch(API_URL_TURMA);
  const turmas = await res.json();

  const container = document.getElementById("turmas-lista");
  container.innerHTML =
    "<h2>Lista de Turmas</h2>" +
    turmas
      .map(
        (t) => `
    <div>
      <strong>${t.nome}</strong> (ID: ${t.id})<br>
      Matéria: ${t.materia}<br>
      Descrição: ${t.descricao}<br>
      Ativo: ${t.ativo ? "Sim" : "Não"}<br>
      Professor ID: ${t.professor_id}<hr>
    </div>
  `
      )
      .join("");
});