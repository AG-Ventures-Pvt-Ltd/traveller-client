import type { Metadata } from 'next';
import VerificationForm from './VerificationForm';
import { loadTeams } from './teams.server';

export const metadata: Metadata = {
  title: 'HTH x Wondrr | Verify Your Registration',
  description: 'Verify your HTH x Wondrr registration.',
  robots: { index: false, follow: false },
};

export default function HthxWondrrPage() {
  // Only name + ID go to the browser (for typeahead); passwords and leader emails stay server-side.
  const suggestions = loadTeams().map(({ name, id }) => ({ name, id }));

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-4 py-10 sm:py-16">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-black text-3xl font-extrabold">HTH x Wondrr</h1>
          <p className="text-subtext text-base">Verify your registration</p>
        </div>
        <VerificationForm suggestions={suggestions} />
      </div>
    </main>
  );
}
