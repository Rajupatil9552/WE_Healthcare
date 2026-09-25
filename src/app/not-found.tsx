import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { mainNav } from "@/config/navigation";

export default function NotFound() {
  return (
    <PagePlaceholder
      eyebrow="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has moved."
      links={mainNav.map(({ label, href }) => ({ label, href }))}
    />
  );
}
