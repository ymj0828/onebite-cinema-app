'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import style from './modal.module.css';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(style);

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      onClose={() => router.back()}
      onClick={(e) => {
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      className={cx('modal')}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
