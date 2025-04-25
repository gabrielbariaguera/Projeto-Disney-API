import { getCache, saveCache } from "./utils.js";

//Buscar na API
export async function getCharacters() {
  const url = 'https://api.disneyapi.dev/character';
  const allCharacters = [];

  try {
    //Primeiro fetch para pegar a 1ª página e saber quantas existem
    const response = await fetch(`${url}?page=1`);
    const json = await response.json();
 
    if (!Array.isArray(json.data)) throw new Error("Formato inválido");

    allCharacters.push(...json.data); //Salva da primeira página

    const totalPages = json.info.totalPages;

    //Busca o resto das páginas (2 em diante)
    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(`${url}?page=${page}`);
      const data = await res.json();
      allCharacters.push(...data.data); // junta no array
    }

    return allCharacters;

  } catch (error) {
    console.error("Erro ao buscar todos os personagens:", error);
    return [];
  }
}

export async function searchByName(name) {
  const allCharacters = [];
  const cache = getCache(name);
  if(cache) return cache;
  try {
    const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const json = await response.json();
    const data = Array.isArray(json.data) ? json.data : [json.data]; //Se n for array, transforma em array
    saveCache(name, data)
    return data;
  } catch (error) {
    console.error("Erro ao buscar personagem por nome:", error);
    return [];
  }
}


