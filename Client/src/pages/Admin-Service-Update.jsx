import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const AdminServiceUpdated = () => {
  const [data, setData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
    image: ""
  });

  const params = useParams();
  console.log("params single user: ", params);
  const { authorizationToken } = useAuth();

  // Get single user data
  const getSingleServiceData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/services/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`Services single data:  ${data}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleServiceData();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/services/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Not Updated ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update Service Data</h1>
      </div>
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSumbit} className="grid-two-cols">
            <div>
              <label htmlFor="service">Service</label>
              <input
                type="text"
                name="service"
                id="service"
                autoComplete="off"
                value={data.service}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                autoComplete="off"
                value={data.description}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                autoComplete="off"
                value={data.price}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="provider">Provider</label>
              <input
                type="text"
                name="provider"
                id="provider"
                autoComplete="off"
                value={data.provider}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                id="image"
                autoComplete="off"
                value={data.image}
                onChange={handleInput}
                required
              />
            </div>

            <div className="full-width">
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
