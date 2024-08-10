import{BrowserRouter,Routes,Route,useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import {NAVBAR} from "./components/navbar";
import {Error} from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-layouts";
import { AdminUsers } from "./pages/AdminUser";
import { AdminContacts } from "./pages/Admin-Contact";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminService } from "./pages/AdminService";
import {AdminServiceUpdated} from "./pages/Admin-Service-Update";
import {AdminAddServices} from "./pages/AdminAddServices";
import { ServiceBuy } from "./pages/ServiceBuy";


export const ShowFooter = () => {
  const location = useLocation();
  if (location.pathname !== "/admin" &&location.pathname!=="/admin/users" &&   location.pathname!=="/admin/contacts" && location.pathname!=="/admin/services/add" && location.pathname!=="/admin/services"  ) return <Footer />;
  else return <></>;
};

export const ShowHeader=()=>{
  const location=useLocation();
  if(location.pathname!=="/admin" && location.pathname!=="/admin/users" &&   location.pathname!=="/admin/contacts" && location.pathname!=="/admin/services/add" && location.pathname!=="/admin/services"  )return <NAVBAR/>;
  else return<></>
}

const App =()=>{
  return(
    <>
    <BrowserRouter>
    <ShowHeader/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/services/:id" element={<ServiceBuy />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="service/:id" element={<ServiceBuy />} />;    
      <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="services/add" element={<AdminAddServices />} />
            <Route path="services" element={<AdminService/>}/>
            <Route path="services/:id/edit" element={<AdminServiceUpdated/>}/>
           
            </Route>
      
    </Routes>
    <ShowFooter/>
    </BrowserRouter>
    </>
  )
}


export default App;