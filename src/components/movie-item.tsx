import { MovieData } from '@/types';

import style from './movie-item.module.css';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

const cx = classNames.bind(style);

interface MovieItem extends MovieData {
  imgSize: 'sm' | 'md';
}

const posterSize = {
  sm: { width: 156, height: 234 },
  md: { width: 263, height: 395 },
};

export default function MovieItem({ id, title, posterImgUrl, imgSize }: MovieItem) {
  return (
    <Link className={cx('container')} href={`/movie/${id}`}>
      <Image
        src={posterImgUrl}
        alt={`영화 ${title}의 표지 이미지`}
        width={posterSize[imgSize].width}
        height={posterSize[imgSize].height}
      />
    </Link>
  );
}
