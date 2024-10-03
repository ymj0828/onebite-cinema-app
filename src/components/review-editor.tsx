'use client';

import { createReviewAction } from '@/actions/create-review.action';

import { useActionState, useEffect } from 'react';

import style from './review-editor.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={cx('form_container')} action={formAction}>
        <input name="movieId" value={movieId} hidden />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div className={cx('submit_container')}>
          <input disabled={isPending} required name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
