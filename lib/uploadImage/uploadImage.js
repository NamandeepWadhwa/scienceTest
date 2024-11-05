export default async function uploadImage(formData) {

try {
  const response = await fetch(process.env.NEXT_PUBLIC_IMAGESTORE, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
 return  data.secure_url;
} catch (err) {
  console.log(err);
  alert("An error occurred during file upload.");
  return null;
}

}
