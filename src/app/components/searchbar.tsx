'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </form>
    </div>
  );
}
