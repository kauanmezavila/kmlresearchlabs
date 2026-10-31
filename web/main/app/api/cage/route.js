export async function GET() {
  const response = await fetch(
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Nicolas+Cage&gsrnamespace=6&gsrlimit=50&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json",
    {
      headers: {
        "User-Agent": "CageRandomizer/1.0",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json({ error: "API Error" }, { status: 502 });
  }

  const data = await response.json();
  const images = Object.values(data.query?.pages || {}).filter(
    (page) => page.imageinfo?.[0]?.thumburl,
  );

  if (!images.length) {
    return Response.json({ error: "No image found" }, { status: 404 });
  }

  const selected = images[Math.floor(Math.random() * images.length)];

  return Response.json({
    image: selected.imageinfo[0].thumburl,
  });
}
