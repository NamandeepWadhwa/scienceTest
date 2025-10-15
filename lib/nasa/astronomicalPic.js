const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function getImage() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 seconds

  try {
    const res = await fetch(`${url}/nasaImage`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal, // attach abort signal
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Error loading image: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data) {
      throw new Error(
        "No data received for the Astronomical Picture of the Day"
      );
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Request timed out after 15 seconds");
      throw new Error("Request timed out after 15 seconds");
    }
    console.error(err.message, "from image data");
    throw new Error("Error loading Astronomical Picture of the Day");
  } finally {
    clearTimeout(timeout);
  }
}
