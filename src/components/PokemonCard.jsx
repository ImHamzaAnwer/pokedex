/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex-shrink-0 m-2 relative overflow-hidden bg-slate-400 rounded-lg shadow-lg group"
    >
      <svg
        className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] duration-700"
        viewBox="0 0 375 283"
        fill="none"
        style={{ opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: "radial-gradient(black, transparent 60%)",
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: 0.2,
          }}
        ></div>
        <img
          className="relative w-40"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">#{pokemon.order}</span>
        <div className="flex justify-between">
          <span className="block tracking-wider text-xl capitalize">
            {pokemon.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
