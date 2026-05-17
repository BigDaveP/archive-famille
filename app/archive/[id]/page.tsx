import PageShell from '@/components/PageShell';
import PuzzleTerminal from '@/components/PuzzleTerminal';

export default async function PuzzlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageShell>
      <PuzzleTerminal itemId={id} />
    </PageShell>
  );
}
