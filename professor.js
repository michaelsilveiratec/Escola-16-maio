const API_URL_PROFESSOR =
  "https://school-system-spi.onrender.com/api/professores";

document
  .getElementById("professor-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      nome: form.nome.value,
      materia: form.materia.value,
      observacoes: form.observacao.value,
      idade: form.idade.value,
    };

    const response = await fetch(API_URL_PROFESSOR, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Professor cadastrado!");
    console.log(result);
    form.reset();
  });

document
  .getElementById("listar-professores")
  .addEventListener("click", async () => {
    const res = await fetch(API_URL_PROFESSOR);
    const professores = await res.json();

    const container = document.getElementById("professores-lista");
    container.innerHTML =
      "<h2>Lista de Professores</h2>" +
      professores
        .map(
          (p) => `
    <div>
      <strong>${p.nome}</strong> (ID: ${p.id})<br>
      Matéria: ${p.materia}<br>
      Observação: ${p.observacoes}<hr>
      Idade: ${p.idade}<hr>
    </div>
  `
        )
        .join("");
  });