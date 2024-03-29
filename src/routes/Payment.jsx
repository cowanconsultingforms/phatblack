import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import "../Styles/Payment.css"
import { useNavigate } from "react-router-dom";

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
function Payment({ cost, plan}){
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
            card: elements.getElement(CardElement)
        });
        setProcessing(true);
        //post request to backend for payment
        try {
            const {id} = paymentMethod;
            const response = await fetch(
                subscriptionPaymentUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ payment: cost, id: id}),
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
                alert(data.error || 'Failed to subscribe');
                setProcessing(false);
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error subscribing user:", error);
            alert('Error processing payment');
            setProcessing(false);
            setSuccess(false);
        } 
    }

    return(
        <div>
            {!success ? 
            <div>
            <h1>{plan} Plan: ${cost}</h1>
            <br></br>
            <form onSubmit={handlePaymentSubmission}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}></CardElement>
                    </div>
                </fieldset>
                <button className="paymentButton">{!processing ? "Subscribe to PhatBlack Premium" : "Processing..."}</button>
            </form>
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