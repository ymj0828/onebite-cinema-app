import { MovieData } from '@/types';

import style from './page.module.css';
import classNames from 'classnames/bind';
import { Metadata } from 'next';

import MovieItem from '@/components/movie-item';

const cx = classNames.bind(style);

async function AllMovies() {
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
        <MovieItem key={`all-${movie.id}`} imgSize="sm" {...movie} />
      ))}
    </div>
  );
}

async function RecoMovies() {
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
        <MovieItem key={`reco-${movie.id}`} imgSize="md" {...movie} />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: '한입 씨네마',
  description: '한입 씨네마에 등록된 영화들을 만나보세요',
  openGraph: {
    title: '한입 씨네마',
    description: '한입 씨네마에 등록된 영화들을 만나보세요',
    images: ['/thumbnail.png'],
  },
};

export default function Home() {
  return (
    <div className={cx('container')}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecoMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
