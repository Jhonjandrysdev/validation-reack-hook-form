import { Outlet } from "react-router-dom"

const Layout = () => {
    return(
        <div className="w-96 mx-auto mt-10">
        <Outlet/>
        </div>
    )
}

export default Layout