import { getCharacters, searchByName } from "./api.js";
import { buttonDisable, buttonEnable, createList, debounce } from "./utils.js";

document.querySelector("button").addEventListener("click", renderCharacters);

let allCharacters = []; //Armazena personagens carregados
let currentPage = 1;
const itemsPerPage = 5;

async function renderCharacters() {
  try {
    buttonDisable();
    allCharacters = await getCharacters(); //Pega os dados na API
    currentPage = 1; //Começa na página 1
    renderPage(); //Renderiza a primeira página
    buttonEnable();
  } catch (error) {
    document.getElementById("feedback").innerHTML = "Erro ao carregar dados.";
  }
}

function renderPage() {
  const list = document.getElementById("characterList");
  list.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allCharacters.slice(start, end);

  pageItems.forEach(character => {
    createList(character, list);
  });

}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const maxPage = Math.ceil(allCharacters.length / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderPage();
  }
});

const input = document.getElementById("characterInput");

input.addEventListener("input", debounce(async () => {
  const value = input.value.trim();
  if (value.length >= 2) {
    allCharacters = await searchByName(value);
    currentPage = 1;
    renderPage();
  }
}, 600));