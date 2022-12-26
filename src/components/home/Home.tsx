import React, { useState } from "react";
import {
  Button,
  Table,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@faculedesma/ledesma-lib";
import { useQuery } from "react-query";
import PokemonCard from "@components/card/Card";
import { capitalizeFirstLetter } from "src/utils/utils";
import "./home.scss";

const getPokemonIdFromURL = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

const Home = () => {
  const [offset, setOffset] = useState<number>(0);
  const [selectedPokemonId, setSelectedPokemonId] = useState<
    string | undefined
  >(undefined);

  const getPokemons = async ({ queryKey }) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${queryKey[1]}`
    );
    return response.json();
  };

  const { data, isError, isLoading } = useQuery(
    ["pokemons", offset],
    getPokemons
  );

  const handlePrev = () => setOffset(offset - 10);
  const handleNext = () => setOffset(offset + 10);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error!</>;
  }

  const columns = Object.keys(data.results[0]).map((column) =>
    capitalizeFirstLetter(column)
  );
  const rows = data.results.map((row) => [
    capitalizeFirstLetter(row.name),
    row.url,
  ]);

  const handleSelectRow = (id: string) => {
    setSelectedPokemonId(id);
  };

  console.log("me renderizo again");

  return (
    <div className="home">
      <Table>
        <>
          <thead>
            <TableRow>
              <>
                {columns.map((name, columnIndex) => {
                  return (
                    <TableHeaderCell key={columnIndex}>{name}</TableHeaderCell>
                  );
                })}
              </>
            </TableRow>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              return (
                <TableRow
                  key={rowIndex}
                  onClick={() => handleSelectRow(getPokemonIdFromURL(row[1]))}
                >
                  <>
                    {row.map((data, rowDataIndex) => {
                      return <TableCell key={rowDataIndex}>{data}</TableCell>;
                    })}
                  </>
                </TableRow>
              );
            })}
          </tbody>
        </>
      </Table>
      <div>
        <Button onClick={handlePrev} disabled={offset === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={offset === Math.trunc(data.count / 10) + 1}
        >
          Next
        </Button>
        <span>Page: {offset / 10 + 1}</span>
        <span>Pages: {Math.trunc(data.count / 10) + 1}</span>
      </div>
      <div>
        <PokemonCard pokemonId={selectedPokemonId} />
      </div>
    </div>
  );
};

export default Home;
