type ExternalAppPageProps = {
  src: string;
  title: string;
};

export function ExternalAppPage({ src, title }: ExternalAppPageProps) {
  return (
    <main className="fixed inset-0 z-[100] h-dvh w-screen bg-white">
      <iframe src={src} title={title} className="h-full w-full border-0" />
    </main>
  );
}
