import { RepositoryMirrorPage } from "@/components/repository-mirror";

export default function MyFirstVMPage() {
  return (
    <RepositoryMirrorPage
      config={{
        slug: "tiny-agents",
        name: "tiny-agents",
        repository: "kauanmezavila/tiny-agents",
        description: "The python framework for building harnesses and agents",
        language: "Python",
      }}
    />
  );
}
