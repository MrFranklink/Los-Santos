import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const AdminAddServices =() =>{
    const [service,setService] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
        image: ""
        
    });

  
    const { authorizationToken } = useAuth();
    const {storeTokenInLs}=useAuth();

    //Handle Input 

    const handleInput = (e) =>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;

        setService({
            ...service,
            [name]:value,
        });
    };

    //handle form on sumbit 

    const handleSumbit=async (e)=>{
        e.preventDefault();
        console.log(service);
        
        try {

            const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/service/add`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':authorizationToken
                },
                body:JSON.stringify(service)
            })

            const res_data=await response.json();

            if(response.ok)
            {
                storeTokenInLs(res_data.token);
                setService({
                    service: '',
                    description: '',
                    price: '',
                    provider: '',
                    image: ''
                })
                toast.success("Service Added SuccessFully");
               
            }else
            {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

            
           
            console.log(response);
            
        } catch (error) {
            
            console.log(error);
        }
       
    }

    




    return(
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className='registration-image reg-img'>
                            <img
                            src='/images/Logo_2.png' width={600} height={400}
                            ></img>
                        </div>

                        {/**OUR main Registration page */}
                        <div className="registration-form">
                            <h1 className='main-heading mb-3'>Service From </h1>
                            <br/>
                            <form onSubmit={handleSumbit} className="grid grid-two-cols">
                                <div>
                                    <label htmlFor='service'>Service</label>
                                    <input type='text' name='service' value={service.service} onChange={handleInput} placeholder='service' />
                                </div>

                                <div>
                                    <label htmlFor='description'>Description</label>
                                    <input type='text' name='description' value={service.description} onChange={handleInput} placeholder='description' />
                                </div>

                                <div>
                                    <label htmlFor='price'>Price</label>
                                    <input type='text' name='price' value={service.price} onChange={handleInput} placeholder='price' />
                                </div>

                                <div>
                                    <label htmlFor='provider'>Provider</label>
                                    <input type='text' name='provider' value={service.provider} onChange={handleInput} placeholder='provider' />
                                </div>

                                <div>
                                    <label htmlFor='image'>Image</label>
                                    <input type='text' name='image' value={service.image} onChange={handleInput} placeholder='url' />
                                </div>
                                <br />
                                <button type='sumbit' className='btn btn-submit'>Submit Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}
