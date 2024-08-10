import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const Login=()=>{
    const[User,setUser] =useState({
        email:'',
        password:'',
    });


    //Handle Input

    const HandleInput=(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...User,
            [name]:value,
        });

    };

    const navigate=useNavigate();
    const {storeTokenInLs}=useAuth();

    
    //Handle form on Sumbit

    const handleSumbit=async(e)=>{
        e.preventDefault();
        console.log(User);

        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(User)
            })
            const res_data=await response.json();
            if(response.ok)
            {
               
                setUser({
                    email: '',
                    password: '',
                })

                toast.success("Login SuccessFully");
                storeTokenInLs(res_data.token);
                navigate("/");
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message,);
            }

            console.log(response);
        }
        catch (error){
            console.log(error);
        }
    }

    return(
        <>
        <section>
            <main>
                <div className="section-login">
                    <div className="container grid grid-two-cols">
                        <div className='login-image reg-img'>
                            <img
                            src='/images/Logo.png' alt="logo" width={500} height='300'
                            ></img>
                        </div>

                        {/**OUR main Login page */}
                        <div className="Login-form">
                            <h1 className='main-heading mb-3'>LoginFrom </h1>
                            <br/>
                            <form onSubmit={handleSumbit}>
                                <div>
                                    <label htmlFor='email'>email</label>
                                    <input type='text' name='email' value={User.email} onChange={HandleInput} placeholder='email' />
                                </div>

                                <div>
                                    <label htmlFor='password'>password</label>
                                    <input type='password' name='password' value={User.password} onChange={HandleInput} placeholder='password' />
                                </div>
                                <br />
                                <button type='sumbit' className='btn btn-submit'>Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}

