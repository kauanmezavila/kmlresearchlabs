export default function Hero() {
  return (
    <section className="relative isolate mx-auto flex min-h-[750px] max-w-6xl flex-col items-start overflow-visible px-4 py-24 sm:px-6 sm:py-32">
      <div className="relative z-20 max-w-3xl">
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
      <div className="pointer-events-none absolute left-1/2 top-[920px] z-10 h-[1200px] w-[1800px] -translate-x-1/2 -translate-y-1/2">
        <iframe
          src="https://globestudio.app/embed?look=halftone&dotColor=%233bdb00&density=50"
          width="1800"
          height="1200"
          className="border-0"
          title="Globestudio dotted globe"
        />
      </div>
    </section>
  );
}
