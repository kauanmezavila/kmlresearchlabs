export default function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-pretty sm:text-6xl">
          <span>Small</span>
          <span className="bg-gradient-to-r from-[#3bdb00] via-[#31b700] to-[#299a00] bg-[length:200%_auto] bg-clip-text text-transparent">
            {" "}
            projects
          </span>
          <span>
            , <br />
            built in the
          </span>
          <span className="bg-gradient-to-r from-[#3bdb00] via-[#31b700] to-[#299a00] bg-[length:200%_auto] bg-clip-text text-transparent">
            {" "}
            open
          </span>
          <span>.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          A home for experiments, tools and ideas from our community. Browse the
          work or jump into the source.
        </p>
        <p className="text-[#0a0a0a]">
          Hey man! ^ ^ v v &lt; &gt; &lt; &gt; b a
        </p>
      </div>
    </section>
  );
}
