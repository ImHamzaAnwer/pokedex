/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Loading from "./Loading";

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const { state } = useLocation();
  const poke = state ? state.pokemon : null;
  console.log(poke, "poke in details");

  const [pokeDetails, setPokeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState({
    color: "dodgerblue",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-500",
    textColor: "text-blue-500",
  });

  const TABS = ["info", "stats"];
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    LoadSpecies(pokemonName);
  }, [pokemonName]);

  const getCardThemeByPokeColor = (color) => {
    switch (color) {
      case "green":
        setTheme({
          color: "bg-lime-600",
          gradient: "bg-gradient-to-r from-lime-500 to-lime-900",
          textColor: "text-lime-500",
        });
        break;
      case "yellow":
        setTheme({
          color: "bg-yellow-500",
          gradient: "bg-gradient-to-r from-amber-200 to-yellow-500",
          textColor: "text-yellow-500",
        });
        break;
      case "orange":
      case "red":
        setTheme({
          color: "bg-orange-500",
          gradient: "bg-gradient-to-r from-red-500 to-orange-500",
          textColor: "text-orange-500",
        });
        break;
      case "brown":
        setTheme({
          color: "bg-red-900",
          gradient: "bg-gradient-to-r from-red-500 to-red-900",
          textColor: "text-red-900",
        });
        break;
      case "purple":
        setTheme({
          color: "bg-fuchsia-900",
          gradient: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-900",
          textColor: "text-fuchsia-900",
        });
        break;
      case "pink":
        setTheme({
          color: "bg-pink-200",
          gradient: "bg-gradient-to-r from-violet-200 to-pink-200",
          textColor: "text-pink-200",
        });
        break;
      case "gray":
        setTheme({
          color: "bg-slate-500",
          gradient: "bg-gradient-to-r from-slate-300 to-slate-500",
          textColor: "text-slate-500",
        });
        break;
      default:
        setTheme({
          color: "bg-blue-500",
          gradient: "bg-gradient-to-r from-cyan-500 to-blue-500",
          textColor: "text-blue-500",
        });
        break;
    }
  };

  async function LoadSpecies(pokemonName) {
    try {
      setLoading(true);
      let pokeSpecies = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      );
      console.log(pokeSpecies, "pokeSpecies");
      let pokeEvolution = await axios.get(pokeSpecies.data.evolution_chain.url);

      let flavor_text_sword = "";
      let flavor_text_shield = "";
      let flavor_text_default = "";
      pokeSpecies.data.flavor_text_entries.map((item) => {
        if (item.language.name != "en") return false;
        if (item.version.name == "sword") {
          flavor_text_sword = item.flavor_text;
        } else if (item.version.name == "shield") {
          flavor_text_shield = item.flavor_text;
        }
        flavor_text_default = item.flavor_text;
      });

      let abilities = "";
      poke.abilities.map((item, index) => {
        abilities += `${item.ability.name}${
          poke.abilities.length == index + 1 ? "" : ", "
        }`;
      });

      let types = poke.types.map((item) => item.type.name);

      let stats = poke.stats.map((item) => ({
        name: item.stat.name,
        value: item.base_stat,
      }));

      var obj = {
        id: poke.id,
        name: pokemonName,
        abilities,
        types,
        stats,
        color: pokeSpecies.data.color?.name,
        flavor_text_sword,
        flavor_text_shield,
        flavor_text_default,
        height: poke.height,
        weight: poke.weight,
        gender_rate: pokeSpecies.data.gender_rate,
        capture_rate: pokeSpecies.data.capture_rate,
        habitat: pokeSpecies.data.habitat?.name,
        evolution: pokeEvolution.data.chain,
        image: poke.sprites.other["official-artwork"].front_default,
      };

      console.log(obj);
      getCardThemeByPokeColor(obj.color);
      setPokeDetails(obj);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-1 justify-center items-center md:min-h-screen">
      {pokeDetails ? (
        <div
          className={`w-full md:w-[85%] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] 
            flex md:flex-row flex-col h-full md:h-[90vh] rounded-md`}
        >
          {/* image section */}
          <div
            className={`${theme.gradient} flex justify-center md:w-[20%] w-full z-40 py-10 md:py-0`}
          >
            <img
              className="z-50 object-contain self-center w-40 md:scale-[1.8] pointer-events-none"
              width={"100%"}
              height={"100%"}
              src={pokeDetails.image}
            />
          </div>

          {/* details section */}
          <div className="bg-gray-50 py-10 md:py-5 md:pt-0 w-full h-full px-5 md:px-2 flex flex-col justify-center items-center">
            <p className="text-5xl text-center text-neutral-800">
              {pokeDetails.name.toUpperCase()}
            </p>

            <div className="w-max m-auto flex gap-x-2 my-4">
              {pokeDetails.types.map((type, i) => (
                <Chip theme={theme} key={i} type={type} />
              ))}
            </div>

            <p className="font-extralight text-center text-lg tracking-wider text-gray-600 w-full md:w-2/3">
              {pokeDetails.flavor_text_default}
            </p>

            <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-gray-500 mt-8 mb-4 rounded-md overflow-hidden">
              {TABS.map((tab, i) => (
                <li onClick={() => setActiveTab(i)} key={i}>
                  <span
                    className={`inline-block px-4 py-2 uppercase ${
                      activeTab === i
                        ? `text-white bg-zinc-800`
                        : "text-gray-700 bg-gray-200 cursor-pointer"
                    }`}
                  >
                    {tab}
                  </span>
                </li>
              ))}
            </ul>

            <div className="w-full md:w-1/2">
              {activeTab === 0 && (
                <div className="my-4 md:flex md:justify-around md:items-center text-center">
                  <div className="mb-3 md:mb-0">
                    <p className="text-xs tracking-wide">Height</p>
                    <p className={`text-lg font-semibold`}>
                      {Math.round(pokeDetails.height * 10) / 100} M
                    </p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="text-xs tracking-wide">Capture rate</p>
                    <p className="text-lg font-semibold">
                      {Math.round(pokeDetails.capture_rate * 100) / 100}%
                    </p>
                  </div>

                  <div className="mb-3 md:mb-0">
                    <p className="text-xs tracking-wide">Weight</p>
                    <p className="text-lg font-semibold">
                      {Math.round(pokeDetails.weight * 10) / 100} kg
                    </p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="text-xs tracking-wide">Habitat</p>
                    <p className="text-lg font-semibold">
                      {pokeDetails.habitat != null ? pokeDetails.habitat : "-"}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="my-4 w-full md:flex flex-row flex-wrap justify-around">
                  {pokeDetails.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="mb-3 mx-auto md:mr-1 w-[95%] md:w-[47%]"
                    >
                      <p className="uppercase text-xs">
                        {stat.name.replace("-", " ")}
                      </p>

                      <div className="w-full bg-gray-200 rounded-sm">
                        <div
                          className={`${theme.color} text-xs font-medium text-white text-center p-0.5 leading-none rounded-sm`}
                          style={{ width: `${stat.value}%` }}
                        >
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Something went wrong, please try again</p>
      )}
    </div>
  );
};

const Chip = ({ type, theme }) => {
  return (
    <div
      className={`${theme.color} flex select-none items-center whitespace-nowrap rounded-md py-1.5 px-4 text-xs font-bold uppercase text-white`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
          clipRule="evenodd"
        />
      </svg>

      <span className="ml-[7px]">{type}</span>
    </div>
  );
};

export default PokemonDetails;
