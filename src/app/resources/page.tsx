import { getResources } from "@/lib/content";
import { ResourcesPageClient } from "@/components/resources/ResourcesPageClient";

export const metadata = {
  title: "Resources · DG-STEAM Scratch Hub",
};

export default function ResourcesPage() {
  const resources = getResources();

  return <ResourcesPageClient resources={resources} />;
}

