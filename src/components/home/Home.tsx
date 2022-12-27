import React, { useState } from 'react';
import {
  Button,
  Table,
  TableRow,
  TableHeaderCell,
  TableCell
} from '@faculedesma/ledesma-lib';
import PokemonCard from '@components/card/Card';
import { usePokemons } from '@components/hooks/usePokemons';
import { capitalizeFirstLetter } from '@utils/utils';
import './home.scss';

const getPokemonIdFromURL = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const Home = (): JSX.Element => {
  const [offset, setOffset] = useState<number>(0);
  const [selectedPokemonId, setSelectedPokemonId] = useState<
    string | undefined
  >(undefined);

  const { data, isLoading, isError } = usePokemons(offset);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  const handleSelectRow = (id: string): void => setSelectedPokemonId(id);

  const handlePrev = (): void => setOffset(offset - 10);

  const handleNext = (): void => setOffset(offset + 10);

  if (data !== undefined) {
    const columns = Object.keys(data.results[0]).map((column) =>
      capitalizeFirstLetter(column)
    );
    const rows = data.results.map((row: any) => [
      capitalizeFirstLetter(row.name),
      row.url
    ]);

    return (
      <div className="home">
        <Table>
          <>
            <thead>
              <TableRow>
                <>
                  {columns?.map((name, columnIndex) => {
                    return (
                      <TableHeaderCell key={columnIndex}>
                        {name}
                      </TableHeaderCell>
                    );
                  })}
                </>
              </TableRow>
            </thead>
            <tbody>
              {rows?.map((row: any, rowIndex: number) => {
                return (
                  <TableRow
                    key={rowIndex}
                    onClick={() => handleSelectRow(getPokemonIdFromURL(row[1]))}
                  >
                    <>
                      {row.map((data: any, rowDataIndex: number) => {
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
        {selectedPokemonId != null ? (
          <div>
            <PokemonCard pokemonId={selectedPokemonId} />
          </div>
        ) : null}
      </div>
    );
  }

  return <></>;
};

export default Home;
