import movies from '@/mock/dummy.json';

import style from './page.module.css';
import classNames from 'classnames/bind';

import MovieItem from '@/components/movie-item';

const cx = classNames.bind(style);

export default function Page() {
  return (
    <div className={cx('container')}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
