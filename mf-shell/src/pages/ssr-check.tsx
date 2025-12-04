export async function getServerSideProps() {
  return { props: { time: Date.now() } };
}

export default function SSRCheck({ time }: { time: string }) {
  return <div>SSR OK: {time}</div>;
}

export const runtime = "experimental-edge";
