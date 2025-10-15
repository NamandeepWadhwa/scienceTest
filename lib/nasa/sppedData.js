const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function asteriodData() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 seconds

  try {
    const res = await fetch(url + "/getNeo", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal, // attach abort signal
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("There was an error in getting the data");

    const data = await res.json();
    const finalData = [];

    data.forEach((element) => {
      if (element.objects) {
        element.objects.forEach((values) => {
          finalData.push({
            x: values.diameter,
            y: values.closestSpeed,
          });
        });
      }
    });

    return finalData;
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Request timed out after 15 seconds");
      throw new Error("Request timed out after 15 seconds");
    }
    console.error(err.message, "from speed data");
    throw new Error("Error loading asteroid data");
  } finally {
    clearTimeout(timeout);
  }
}
