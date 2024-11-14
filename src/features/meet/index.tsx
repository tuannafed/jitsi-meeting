'use client';

import PageContainer from '@/components/layout/pageContainer';
import { MeetForm } from '@/features/meet/components/MeetForm';

export function JitsiMeetPage() {
  return (
    <PageContainer className="max-w-xl mx-auto flex items-center">
      <MeetForm />
    </PageContainer>
  );
}
