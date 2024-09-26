import movies from '@/mock/dummy.json';

import style from './page.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function Page() {
  const { id, title, subTitle, company, runtime, description, posterImgUrl, releaseDate, genres } =
    movies[3];

  return (
    <div className={cx('container')}>
      <div
        className={cx('cover_img_container')}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
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
    </div>
  );
}
