import { createReviewAction } from '@/actions/create-review.action';

import style from './review-editor.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form className={cx('form_container')} action={createReviewAction}>
        <input name="movieId" value={movieId} hidden />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={cx('submit_container')}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
