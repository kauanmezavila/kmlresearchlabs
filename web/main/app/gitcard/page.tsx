import { RepositoryMirrorPage } from "@/components/repository-mirror";

export default function GitCardPage() {
  return <RepositoryMirrorPage config={{
    slug: "gitcard",
    name: "GitCard",
    repository: "kauanmezavila/gitcard",
    description: "Customizable GitHub profile cards built with native JavaScript and Web Components.",
    language: "JavaScript",
  }} />;
}
