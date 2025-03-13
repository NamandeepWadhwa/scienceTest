import Image from "next/image";
export default function Blog() {
  const tags=["hakai","hakai2","hakai3"];
  return (
    <div
      className="flex flex-col border-b-2 border-gray-200 mx-5 mt-5 cursor-pointer"
      id="blog"
      role="button"
    >
      <div className="flex flex-wrap items-center py-2">
        <div className="mx-5">
          <Image
            className="rounded-full border-2 border-black"
            src="/images/search.png"
            width={50}
            height={50}
            alt="author"
          />
        </div>
        <span className="mr-5 text-2xl">Author Name</span>
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span className="mx-2 bg-red-600 text-white border-2 border-red-600 rounded-lg" id={`tag-${index}`} key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="m-5 text-2xl">
        Title can be anything here, this is just a testing title, and it can be
        anything.
      </div>
      <div className="flex flex-wrap">
        <span className="ml-5"> Oct 18, 2024</span>
        <div className="flex flex-wrap ml-5">
          <span>
            <Image src="/images/heart.png" width={25} height={25} alt="likes" />
          </span>
          <span>25</span>
        </div>
      </div>
    </div>
  );
}
