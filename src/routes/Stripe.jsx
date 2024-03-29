import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import { useParams } from 'react-router-dom';

const publishableKey = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY;
const stripe =  loadStripe(publishableKey);

//stripe container component
const Stripe = () => {
  const [plan, setPlan] = useState(''); 
  const [cost, setCost] = useState(0); 
  const { param } = useParams();

  //set params prop for routing
  useEffect(() => {
    setPlan(plan);
    if (param === 'trial') {
      setCost(0.00);
    } else if (param === 'monthly') {
      setCost(1.00);
    } else if (param === 'yearly') {
      setCost(10.80);
    } else if (param === 'nft') {
      setCost(1000.00)
    }
  }, [param]);

  return (
    <Elements stripe={stripe}>
      <Payment param={param} cost={cost} plan={plan}></Payment>
    </Elements>
  );
}

export default Stripe;
