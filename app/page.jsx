import { getJobs, getCourses, getSampleProfiles } from '@/lib/dataLoader';
import ClientDashboard from '@/components/ClientDashboard';

export default function Page() {
  const jobs = getJobs();
  const courses = getCourses();
  const sampleProfiles = getSampleProfiles();

  return (
    <ClientDashboard
      initialJobs={jobs}
      initialCourses={courses}
      initialSampleProfiles={sampleProfiles}
    />
  );
}
