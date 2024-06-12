import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PKxpqIc3QY8b29xeA2yWWLRyEeyGlTQABliLLt1q6KBKHhw6fsfes6gVZhNdz4ylR98qiHNdg3Z1uGck1nqgZJ500FKpnmySr"
);

export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [SearchParams, setSearchParams] = useSearchParams("") || null;
  useEffect(() => {
    const product = Object.fromEntries(SearchParams.entries());
    console.log(product.products);
    setSearchParams(product);
    console.log(SearchParams);

    // Create PaymentIntent as soon as the page loads

    fetch("http://localhost:9000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: JSON.parse(product.products) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className="App">
        <h1>Checkout</h1>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
};
