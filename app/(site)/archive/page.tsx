import PageShell from '@/components/PageShell';
import ArchiveTerminal from '@/components/ArchiveTerminal';

export const metadata = {
  title: 'ARCHIVE_FAMILLE — DOSSIERS',
};

export default function ArchivePage() {
  return (
    <PageShell>
      <ArchiveTerminal />
    </PageShell>
  );
}
