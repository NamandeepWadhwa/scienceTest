const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function getImage() {
  try {

    const res = await fetch(`${url}/nasaImage`, {
      
cache:"no-store",      method: "GET",
  
      headers: {
        "Content-Type": "application/json", // Corrected header key
      },
    });

    if (!res.ok) {
      // Handle non-200 status codes
      throw new Error(`Error loading image: ${res.statusText}`);
    }

    const data = await res.json(); // Await JSON conversion

    if (!data) {
      throw new Error(
        "No data received for the Astronomical Picture of the Day"
      );
    }
    

    return data; // Return the fetched data

  } catch (err) {
    console.error(err.message); // Log the error message
    throw new Error("Error loading Astronomical Picture of the Day");
  }
}
