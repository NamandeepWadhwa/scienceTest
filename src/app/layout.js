import "./globals.css";
import SideBar from "../../components/layout/sideBar";
import SideBarMd from "../../components/layout/sideBarMD";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="sticky top-0 w-full flex justify-center bg-navbar z-50 h-14">
          <SideBarMd />
          <SideBar />
        </div>

        {/* Main content should take up remaining space */}
        <div className=" h-svh bg-white ">{children}</div>

        {/* Footer stays at the bottom */}
        
      </body>
    </html>
  );
}
