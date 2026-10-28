import { RepositoryMirrorPage } from "@/components/repository-mirror";

export default function MyFirstVMPage() {
  return (
    <RepositoryMirrorPage
      config={{
        slug: "resenhudo",
        name: "resenhudo",
        repository: "kauanmezavila/resenhudo",
        description: "O bot mais resenhudo do Brasil no seu servidor",
        language: "Python",
      }}
    />
  );
}
