import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonList: builder.query({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
  }),
});

type UseGetPokemonByNameQueryType = typeof pokemonApi.useGetPokemonByNameQuery;
type UseGetPokemonListQueryType = typeof pokemonApi.useGetPokemonListQuery;

export const useGetPokemonByNameQuery: UseGetPokemonByNameQueryType =
  pokemonApi.useGetPokemonByNameQuery;
export const useGetPokemonListQuery: UseGetPokemonListQueryType =
  pokemonApi.useGetPokemonListQuery;
