import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Stripe.css";
import ImgCO2 from "../../images/CO2-tracker.png";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HfzDZHwLtaB4yxIao26UUOBQ30NgJs6rpsmIw8fTeSgjWxXXKiVkED7uQNbW4qlgAvUt7is4Ge1XVrt8ALmG9Em00RPO9CDC2"
);

const ProductDisplay = ({ handleClick }) => (
  <div>
    <div className="col s12 l3">
      <img
        alt="Complete device"
        src={ImgCO2}
        className="device-img img-centered mb20"
      />
    </div>
    <div className="col s12 l5 push-l4 center-align">
    <h3 className="mt20">CO₂ tracker device</h3>
      <p>
        Skip the work of assembling the device yourself, and pay us $399
        instead.
      </p>
      <button
        className="btn-large green-btn device-btn"
        id="checkout-button"
        role="link"
        onClick={handleClick}
      >
        Buy Directly
      </button>
    </div>
  </div>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetch("/create-session", {
      method: "POST",
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
