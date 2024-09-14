export default function SideBarMd(){
  return (
    <>
      <div className="absolute left-0  m-5 bg-red-600 ">Logo</div>
      <div className="hidden md:flex justify-between text-reguarlText m-5 text-lg">
        <ul className="flex space-x-8">
          <li>
            <a href="#" className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Pic of the Day
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Blogs
            </a>
          </li>
        </ul>
      </div>

      <div className="hidden md:block absolute right-0 m-5 ">
        <button className=" text-lg hover:text-gray-600 text-reguarlText">
          Sign In
        </button>
      </div>
    </>
  );
}