import React, { memo, useState } from 'react';
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableSkeleton,
  Pagination
} from '@faculedesma/ledesma-lib';
import { usePokemons } from '@components/hooks/usePokemons';
import { capitalizeFirstLetter, getPokemonIdFromURL } from '@utils/utils';
import './home.scss';

interface IHomeTableProps {
  setPokemonId: (id: string) => void;
}

const TableLoading: React.FC = (): JSX.Element => <TableSkeleton />;

const HomeTable: React.FC<IHomeTableProps> = ({
  setPokemonId
}): JSX.Element => {
  const [offset, setOffset] = useState<number>(0);
  let count: number = 0;
  let rows: string[][] = [];
  let columns: string[] = [];

  const { data, isLoading, isError } = usePokemons(offset);

  if (data !== undefined) {
    columns = ['N#', capitalizeFirstLetter(Object.keys(data.results[0])[0])];
    rows = data.results.map((row: any) => [
      getPokemonIdFromURL(row.url),
      capitalizeFirstLetter(row.name)
    ]);
    count = data.count;
  }

  if (isError) {
    console.error('Failed to load pokemons');
    return (
      <div className="home-table">
        <TableLoading />
      </div>
    );
  }

  const handleSelectRow = (id: string): void => setPokemonId(id);

  const handlePrev = (): void => setOffset(offset - 10);

  const handleNext = (): void => setOffset(offset + 10);

  return (
    <div className="home-table">
      {isLoading ? (
        <TableLoading />
      ) : (
        <Table rowSize="small" bordered>
          <>
            <thead>
              <TableRow>
                <>
                  {columns.map((name, columnIndex) => {
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
              {rows.map((row, rowIndex) => {
                return (
                  <TableRow
                    key={rowIndex}
                    onClick={() => handleSelectRow(row[0])}
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
      )}
      <Pagination
        currentPage={offset === 0 ? 1 : offset / 10 + 1}
        totalItems={count}
        pageSize={10}
        onNextPage={handleNext}
        onPreviousPage={handlePrev}
      />
    </div>
  );
};

export default memo(HomeTable);
