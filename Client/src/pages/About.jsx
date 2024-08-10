import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {
 
  const { user } = useAuth();

  

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Hi,{user ? user.username : `Guest`}</p>


              <h1>Why Choose Us? </h1>
              <p>
              Expertise and Experience: With years of experience under our belts, we know cars inside and out. Our team is dedicated to delivering top-quality workmanship on every project.
              </p>
              <p>
              Customer Satisfaction: Your satisfaction is our top priority. We work closely with you to ensure every detail meets your expectations.
              </p>
              <p>
              State-of-the-Art Equipment: We use the latest technology and equipment to provide the best service possible.
              </p>
              <p>
              Passion for Cars: We share your passion for automobiles. Whether it's a classic muscle car or a modern sports car, we treat every vehicle with the care and attention it deserves.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">learn more</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/logo_3.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};