import { ReviewData } from '@/types';

import ReviewItemDeleteButton from './review-item-delete-button';
import style from './review-item.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function ReviewItem({ id, content, author, createdAt, movieId }: ReviewData) {
  return (
    <div className={cx('container')}>
      <div className={cx('author')}>{author}</div>
      <div className={cx('content')}>{content}</div>
      <div className={cx('bottom_container')}>
        <div className={cx('date')}>{new Date(createdAt).toLocaleString()}</div>
        <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
