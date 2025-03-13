import BlogNavbar from "../../../components/blog/navBar";
import Blog from "../../../components/blog/blog";


export default function HomePage() {
  return (
    <>
      <div className="h-screen flex flex-col ">
        <BlogNavbar />

        {/* Make this div scrollable instead of the entire page */}
        <div
          className="flex flex-col overflow-y-auto mb-16"
          id="blogsContainer"
        >
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
        </div>
      </div>
    </>
  );
}
