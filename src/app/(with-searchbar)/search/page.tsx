export default function Page({ searchParams: { q } }: { searchParams: { q?: string } }) {
  return <div>검색 결과 : {q}</div>;
}
