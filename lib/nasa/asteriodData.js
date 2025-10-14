const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function asteriodData() {
  try {
    const res = await fetch(url + "/getNeo", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    console.error(err.message,'from astroid data');
    throw new Error("Error loading asteroid data");
  }
}
