
"use server";
export default async function Page({params}) {
const {id}=params;
 return <>
<p>{id}</p>
 </>

}