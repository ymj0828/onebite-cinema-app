export default function Page({ params: { id } }: { params: { id: string | string[] } }) {
  return <div>movie : {id}</div>;
}
