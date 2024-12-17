import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./components/PokemonList";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />,
  },
  {
    path: "pokemon/:pokemonName",
    element: <PokemonDetails />,
  },
]);
function App() {
  return (
    <div className="bg-neutral-200">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
