import { useAuth } from "../store/auth"
import {useNavigate} from "react-router-dom";
export const Services=()=>{
    const{services}=useAuth();
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/services/${id}`);
      };
    return (
        <section className="section-services"> 
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">
                {services.map((curr,index)=>{
                    const{_id,provider,price,service,description,image}=curr;
                    return(
                        <div className="card" key={index} onClick={()=>handleCardClick(_id)}>
                    <div className="card-img">
                        <img src={image} alt="put image here"/>
                    </div>

                    <div className="card-details">
                        <div className="grid grid-two-cols">
                            <p>{provider}</p>
                            <p>{price}</p>
                        </div>
                        <h2>{service}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                    )
                })}
                
            </div>
        </section>
    )

}