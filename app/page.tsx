import PageClient from "@/components/PageClient";
import { getPassportImages } from "@/lib/passports";

export default function Page() {
  return <PageClient passports={getPassportImages()} />;
}
