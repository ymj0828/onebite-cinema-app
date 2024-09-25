import { MovieData } from '@/types';

import style from './movie-item.module.css';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(style);

export default function MovieItem({
  id,
  title,
  subTitle,
  description,
  releaseDate,
  company,
  genres,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link className={cx('container')} href={`/movie/${id}`}>
      <img src={posterImgUrl} />
    </Link>
  );
}
