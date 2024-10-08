import { MovieData, ReviewData } from '@/types';

import style from './page.module.css';
import classNames from 'classnames/bind';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import ReviewEditor from '@/components/review-editor';
import ReviewItem from '@/components/review-item';

const cx = classNames.bind(style);

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const movies: MovieData[] = await response.json();

  return movies.map(({ id }) => ({ id: id.toString() }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  const { title, subTitle, company, runtime, description, posterImgUrl, releaseDate, genres } =
    movie;

  return (
    <section>
      <div
        className={cx('cover_img_container')}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <Image src={posterImgUrl} alt={`영화 ${title}의 표지 이미지`} width={233} height={350} />
      </div>
      <div className={cx('info_container')}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(', ')} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={cx('subTitle')}>{subTitle}</div>
          <div className={cx('description')}>{description}</div>
        </div>
      </div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
    { next: { tags: [`review-${movieId}`] } },
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const movie: MovieData = await response.json();

  return {
    title: `${movie.title} - 한입 씨네마`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title} - 한입 씨네마`,
      description: `${movie.description}`,
      images: [movie.posterImgUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  return (
    <div className={cx('container')}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
