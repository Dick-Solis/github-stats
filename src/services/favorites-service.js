import apiFetch from "./api-fetch";

export function createFavorite(data){
  return apiFetch("/favorites", {body: data});
}

export function removeFavorite(id){
  return apiFetch("/favorites/"+id, {method: "DELETE"});
}

export function getFavorites(){
  return apiFetch("/favorites");
}