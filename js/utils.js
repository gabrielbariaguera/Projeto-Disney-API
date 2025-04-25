//Criação de lista
export function createList(character, container) {
    const card = document.createElement("div");
  card.className = "card";
  card.style.width = "12rem";

  card.innerHTML = `
    <img src="${character.imageUrl}" class="card-img-top" alt="${character.name}" style="height: 180px; object-fit: cover;">
    <div class="card-body">
      <h5 class="card-title text-center">${character.name}</h5>
    </div>
  `;

  container.appendChild(card);
  }

//Deixando o botão desabilitado após clicar para carregar personagens
export function buttonDisable() {
    const btn = document.querySelector("button");
    btn.disabled = true;
    btn.innerHTML = "Carregando...";
}
export function buttonEnable() {
    const btn = document.querySelector("button");
    btn.disabled = false;
    btn.innerHTML = "Gerar personagens";
}

//Função de debounce
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getCache(name) {
  const expirationMs = 5 * 60 * 1000; // 5 minutos
  const cache = JSON.parse(localStorage.getItem(`disney:search:${name.toLowerCase()}`));
  if (cache && Date.now() - cache.timestamp < expirationMs) { 
    console.log("Usando cache localStorage"); 
    return cache.data;
  } 
}

export function saveCache(name, data) {
  localStorage.setItem(`disney:search:${name.toLowerCase()}`, JSON.stringify({
    data: data,
    timestamp: Date.now()
  }));
  return data;
}