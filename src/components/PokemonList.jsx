/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { motion } from "framer-motion";

const PokemonList = () => {
  const navigate = useNavigate();
  const limit = 15; // Number of pokemons per page
  const totalPokemons = 500; // Total number of pokemons

  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, [currentPage]);

  const loadPokemons = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * limit;
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonDetailsPromises = data.data.results.map((pokemon) =>
      getPokemonDetails(pokemon.url)
    );
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    // console.log(pokemonDetails, "pokemonDetails");
    setPokemons(pokemonDetails);
    setLoading(false);
  };

  const getPokemonDetails = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <p className="uppercase py-5 text-center text-5xl text-yellow-500 stroke-gray-950 stroke-2">
        pokedex
      </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-screen-xl mx-auto px-10 md:px-5"
      >
        {pokemons.map((pokemon, i) => (
          <motion.div key={i} variants={itemVariants}>
            <PokemonCard
              onClick={() =>
                navigate(`/pokemon/${pokemon.name}`, { state: { pokemon } })
              }
              key={i}
              pokemon={pokemon}
            />
          </motion.div>
        ))}
      </motion.div>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(totalPokemons / limit)}
      />
    </>
  );
};

export default PokemonList;
