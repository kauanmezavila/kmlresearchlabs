import { RepositoryMirrorPage } from "@/components/repository-mirror";

export default function MyFirstVMPage() {
  return (
    <RepositoryMirrorPage
      config={{
        slug: "MyFirstVM",
        name: "MyFirstVM",
        repository: "kauanmezavila/my-first-vm",
        description:
          "A simple Virtual Machine in python, it's don't follow any real BIOS/OS programming natural logic",
        language: "Python",
      }}
    />
  );
}
