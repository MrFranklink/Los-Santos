import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import PacmanLoader from "react-spinners/PacmanLoader";

export const ServiceBuy = () => {
  const { id } = useParams();
  const { authorizationToken } = useAuth();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/services/${id}`, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service details:", error);
      }
    };

    fetchServiceDetails();
  }, [id, authorizationToken]);

  const handleAddToCart = () => {
    // Logic to add the service to cart
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    // Logic to buy the service immediately
    toast.success("Proceeding to checkout!");
  };

  if (!service) return(
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
  );

  return (
    <section className="section-service-detail">
      <div className="container">
        <h1 className="main-heading">{service.service}</h1>
        <div className="service-detail">
          <div className="service-detail-img">
            <img src={service.image} alt={service.service}  />
          </div>
          <div className="service-detail-info">
            <h2>Provider: {service.provider}</h2>
            <p>Description: {service.description}</p>
            <p>Price: {service.price}</p>
            <div className="service-detail-actions">
              <button onClick={handleAddToCart} className="btn btn-cart">Add to Cart</button>
              <button onClick={handleBuyNow} className="btn btn-buy">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
