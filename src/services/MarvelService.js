// const API_KEY = process.env.REACT_APP_API_KEY;

import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=f99060e3caee654e07c38be727412e72";
  // _apiKey = `apikey=${API_KEY}`;
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter); //9 первых
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`$(_apiBase)comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects.language || "en-us",
      price: comics.prices.price ? `${comics.prices.price}$` : "not available",
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComics,
  };
};

export default useMarvelService;
// // /////////////////////
// class MarvelService {
//   _apiBase = "https://gateway.marvel.com:443/v1/public/";
//   _apiKey = "apikey=f99060e3caee654e07c38be727412e72";
//   // _apiKey = `apikey=${API_KEY}`;
//   _baseOffset = 210;

//   //https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=f99060e3caee654e07c38be727412e72

//   getResource = async (url) => {
//     let res = await fetch(url);
//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}, status:${res.status}`);
//     }
//     return await res.json();
//   };

//   getAllCharacters = async (offset = this._baseOffset) => {
//     const res = await this.getResource(
//       // `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
//       `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
//     );
//     console.log(res);
//     return res.data.results.map(this._transformCharacter); //9 первых
//   };

//   getCharacter = async (id) => {
//     const res = await this.getResource(
//       `${this._apiBase}characters/${id}?${this._apiKey}`
//     );
//     return this._transformCharacter(res.data.results[0]);
//   };

//   _transformCharacter = (char) => {
//     console.log(char.comics);
//     return {
//       id: char.id,
//       name: char.name,
//       description: char.description,
//       thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
//       homepage: char.urls[0].url,
//       wiki: char.urls[1].url,
//       comics: char.comics.items,
//     };
//   };
// }
