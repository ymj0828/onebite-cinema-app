import { MovieData } from '@/types';
import { delay } from '@/utils/delay';

import { Suspense } from 'react';

import style from './page.module.css';
import classNames from 'classnames/bind';

import MovieItem from '@/components/movie-item';

const cx = classNames.bind(style);

async function AllMovies() {
  await delay(1500);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: 'force-cache',
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMovies: MovieData[] = await response.json();
  return (
    <div className={cx('all_container')}>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RecoMovies() {
  await delay(3000);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();
  return (
    <div className={cx('reco_container')}>
      {recoMovies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={cx('container')}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<div>영화를 불러오는 중입니다...</div>}>
          <RecoMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<div>영화를 불러오는 중입니다...</div>}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
