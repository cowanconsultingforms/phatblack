import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Styles/Payment.css';

const Payment = () => {
  const [plan, setPlan] = useState(''); 
  const [cost, setCost] = useState(''); 
  const { id } = useParams();

  useEffect(() => {
    setPlan(id);

    if (id === 'trial') {
      setCost('0.00');
    } else if (id === 'monthly') {
      setCost('1.00');
    } else if (id === 'yearly') {
      setCost('10.80');
    } else if (id === 'nft') {

    }
  }, [id]);
  
  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Payment Method</h1>
      </div>

      <div className='payment-container'>
        <div className="payment-form">
          <h2>VISA/ DISCOVER/ AMERICAN EXPRESS</h2>
          <div className="form-group">
            <input type="text" id="firstName" placeholder="FIRST NAME" />
            <input type="text" id="lastName" placeholder="LAST NAME" />
          </div>
          <div className="form-group">
            <input type="text" id="address" placeholder="ADDRESS" />
          </div>
          <div className="form-group">
            <input type="text" id="city" placeholder="CITY" />
            <input type="text" id="state" placeholder="STATE" />
            <input type="text" id="zipCode" placeholder="ZIP CODE" />
          </div>
          <div className="form-group">
            <input type="text" id="cardNumber" placeholder="CARD NUMBER" />
            <input type="text" id="expiry" placeholder="MM/YY" />
            <input type="text" id="cvv" placeholder=" CVV" />
          </div>
        </div>

        <div className='cart-info'>
          <div>
            <div className='payment-inline'>
            <h2>Your Plan </h2>
            <Link to="/subscribe"><h2>Change</h2></Link>
          </div>
          <div className='payment-inline'>
            <p>Phatblack-Premium-{plan} </p>
            <p>${cost}/{plan}</p>
          </div>
          <div className='payment-inline'>
            <p>Today's Total: </p>
            <p>${cost}</p>
          </div>
          </div>
          
          <div>
            <button className='payment-button'>Start Phatblack-Premium</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Payment;
