import { Outlet,NavLink, Navigate } from "react-router-dom"
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import PacmanLoader from "react-spinners/PacmanLoader";

export const AdminLayout=()=>
{
  const {user,isLoading}=useAuth();

  if(isLoading)
  {
    return(
      <div className="container">
        <div className="paceman" >
        <PacmanLoader
    color="#00bf63"
    cssOverride={{}}
    loading
    margin={1}
    size={25}
    speedMultiplier={4}
  />
        </div>
      </div>
     
    ) 
  }

  if(!user.isAdmin) return <Navigate to="/"></Navigate>
    return<>

<header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services/add">
                <FaRegListAlt /> Add Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaRegListAlt /> Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    
    </>
}