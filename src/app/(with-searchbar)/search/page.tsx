import { MovieData } from '@/types';
import { delay } from '@/utils/delay';

import { Suspense } from 'react';

import style from './page.module.css';
import classNames from 'classnames/bind';

import MovieItem from '@/components/movie-item';

const cx = classNames.bind(style);

async function SearchResult({ q }: { q: string }) {
  await delay(2000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className={cx('container')}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense key={searchParams.q || ''} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
