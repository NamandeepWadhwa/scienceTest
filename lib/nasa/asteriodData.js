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
      signal: controller.signal, // connect to abort controller
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("There was an error in getting the data");

    const data = await res.json();

    let hazardousCount = 0;
    let nonHazardousCount = 0;

    data.forEach((entry) => {
      if (entry.objects) {
        entry.objects.forEach((object) => {
          if (object.isHazardous) {
            hazardousCount++;
          } else {
            nonHazardousCount++;
          }
        });
      }
    });

    return [hazardousCount, nonHazardousCount];
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Request timed out after 15 seconds");
      throw new Error("Request timed out after 15 seconds");
    }
    console.error(err.message, "from asteroid data");
    throw new Error("Error loading asteroid data");
  } finally {
    clearTimeout(timeout);
  }
}
