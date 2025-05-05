import "./sideBar"
import SideBar from "./sideBar";
import "./sideBarMD";
import SideBarMd from "./sideBarMD";

export default  function FinalLayout()
{
    return  <div className="sticky top-0 w-full flex justify-center bg-navbar z-50 h-14"> 
    <SideBar/>
    <SideBarMd/>
    </div>
}