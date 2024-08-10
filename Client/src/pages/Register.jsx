import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const Register =() =>{
    const [User,setUser] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        
    });

    const navigate=useNavigate();

    const {storeTokenInLs}=useAuth();

    //Handle Input 

    const handleInput = (e) =>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;

        setUser({
            ...User,
            [name]:value,
        });
    };

    //handle form on sumbit 

    const handleSumbit=async (e)=>{
        e.preventDefault();
        console.log(User);
        
        try {

            const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(User)
            })

            const res_data=await response.json();

            if(response.ok)
            {
                storeTokenInLs(res_data.token);
                setUser({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                })
                toast.success("Register SuccessFully");
                navigate("/");
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
                            <h1 className='main-heading mb-3'>Registration From </h1>
                            <br/>
                            <form onSubmit={handleSumbit}>
                                <div>
                                    <label htmlFor='username'>username</label>
                                    <input type='text' name='username' value={User.username} onChange={handleInput} placeholder='username' />
                                </div>

                                <div>
                                    <label htmlFor='email'>email</label>
                                    <input type='text' name='email' value={User.email} onChange={handleInput} placeholder='email' />
                                </div>

                                <div>
                                    <label htmlFor='phone'>phone</label>
                                    <input type='number' name='phone' value={User.phone} onChange={handleInput} placeholder='phone' />
                                </div>

                                <div>
                                    <label htmlFor='password'>password</label>
                                    <input type='password' name='password' value={User.password} onChange={handleInput} placeholder='password' />
                                </div>
                                <br />
                                <button type='sumbit' className='btn btn-submit'>Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}
