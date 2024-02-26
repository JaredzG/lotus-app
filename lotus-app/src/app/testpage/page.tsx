'use client';
import { useGetHeroesQuery } from '@/features/api/apiSlice';
import { cn } from '@/lib/utils';
import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';

const attackTypeOrdering = {
  Melee: 1,
  Ranged: 2
};

const TestPage = () => {
  const {
    data: heroes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetHeroesQuery(undefined);

  const selectOrderedHeroes = useMemo(
    () =>
      createSelector(
        (res) => res.data,
        (data) => data.slice().sort((a: any, b: any) => {})
      ),
    []
  );

  console.log(heroes);

  const handleOrderingButtonClick = async () => {};

  return (
    <main>
      <button>Random Ordering</button>
      <div className={cn('flex flex-wrap gap-32 p-28 justify-between')}></div>
    </main>
  );
};

export default TestPage;
