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
    let finalData=[];
    data.forEach(element => {
      element.objects.forEach((values)=>
      {
        finalData.push({
          x: values.diameter,
          y: values.closestSpeed,
        });
      })
    });
    console.log(finalData);

    return finalData;
  } catch (err) {
    console.error(err.message);
    throw new Error("Error loading asteroid data");
  }
}
