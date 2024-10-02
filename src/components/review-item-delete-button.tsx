'use client';

import { deleteReviewAction } from '@/actions/delete-review.action';

import { useActionState, useEffect, useRef } from 'react';

import style from './review-item-delete-button.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form className={cx('button')} ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden />
      <input type="movieId" value={movieId} hidden />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
