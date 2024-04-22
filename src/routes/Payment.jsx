import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import "../Styles/Payment.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//payment card styling
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#ffa646",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Bebas Neue",
			fontSize: "18px",
			":-webkit-autofill": { color: "white" },
			"::placeholder": { color: "white" }
		},
		invalid: {
			iconColor: "red",
			color: "darkgray"
		}
	}
}

//payment component
function Payment({ userId, cost, plan}){
    const [success,setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const subscriptionPaymentUrl = import.meta.env.VITE_APP_SUBSCRIPTION_PAYMENT_URL;
    
    //handle form(credit card) submission for payment
    async function handlePaymentSubmission(event) {
        event.preventDefault();
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: event.target.name.value,
                address: {
                  line1: event.target.address.value,
                  city: event.target.city.value,
                  state: event.target.state.value,
                  postal_code: event.target.postalCode.value,
                  country: event.target.country.value,
                },
              },
        });
        setProcessing(true);
        //post request to backend for payment
        try {
            if (error) {
                throw new Error(error.message);
            }

            const {id} = paymentMethod;
            const response = await fetch(
                subscriptionPaymentUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ paymentCost: cost * 100, id: id, user: userId}),
                }
            );

            const data = await response.json();
            if (response.ok) {
                console.log("Subscribed Successfuly", data);
                alert('Subscribed Successfuly');
                setProcessing(false);
                setSuccess(true);
                setTimeout(()=>{
                    navigate("/");
                },3000);
            } else {
                console.error("Failed to subscribe", data);
                alert(data.message);
                setProcessing(false);
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error subscribing user:", error);
            alert('Error processing payment', error);
            setProcessing(false);
            setSuccess(false);
        } 
    }

    return(
        <div className="payment-container">
            {!success ? 
            <div>
            <h1>{plan} Plan: ${cost}</h1>
            <br></br>
            <form onSubmit={handlePaymentSubmission}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}></CardElement>
                    </div>
                    
                    <div className="FormRow">
                        <input type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="FormRow">
                        <input type="text" name="address" placeholder="Address" required />
                    </div>
                    <div className="FormRow">
                        <input className="row-item" type="text" name="city" placeholder="City" required />
                        <input className="row-item" type="text" name="state" placeholder="State" required />
                    </div>
                    <div className="FormRow">
                        <input className="row-item" type="text" name="postalCode" placeholder="Postal Code" required />
                        <input className="row-item" type="text" name="country" placeholder="Country Ex:(US)" required />
                    </div>
                </fieldset>
                <button className="paymentButton">{!processing ? "Subscribe to PhatBlack Premium" : "Processing..."}</button>
            </form>
            <button onClick={()=>navigate("/subscribe")} className="paymentButton cancel">{"< Go Back"}</button>
            <div className="links">
                <h3 className="link"><Link to="https://phatblack.com/WP/restrictions/" target="_blank">RESTRICTIONS</Link></h3>
                <h3 className="link"><Link to="https://phatblack.com/WP/terms-of-service/" target="_blank">TERMS OF SERVICE</Link></h3>
                <h3 className="link"><Link to="https://phatblack.com/WP/privacy-policy/" target="_blank">PRIVACY POLICY</Link></h3>
            </div>
            </div>
            :
            <div>
                <h1>You are now a PhatBlack Premium user</h1>
                <br></br>
                <h1>Redirecting you to the home page...</h1>
            </div>
            }
        </div>
    );
}

export default Payment;