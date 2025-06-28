import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const publishableKey = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY;
const stripe =  loadStripe(publishableKey);

//stripe container component
const Stripe = () => {
  const [plan, setPlan] = useState(''); 
  const [cost, setCost] = useState(0); 
  const { param } = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState("");

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
      setCost(10000.00)
    }
  }, [param]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUserId(user.uid);
            setIsLoggedIn(true);
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists() && ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor'].includes(userDoc.data().role)) {  
              setSubscribed(true);
            } else if (!userDoc.exists()) {
              console.log("Stripe - User document does not exist, creating for manually added admin user");
              // Create the user document with admin role
              try {
                const userData = {
                  email: user.email,
                  uid: user.uid,
                  role: 'admin', // Set as admin since they were manually added
                  createdAt: new Date(),
                  username: user.email?.split('@')[0] || 'admin'
                };
                
                await setDoc(doc(db, "users", user.uid), userData);
                console.log("Stripe - Created user document with admin role");
                setSubscribed(true);
              } catch (error) {
                console.error("Stripe - Error creating user document:", error);
                setSubscribed(false);
              }
            } else {
              setSubscribed(false);
            }
        } else {
          setIsLoggedIn(false);
          setSubscribed(false);
        }
    });

    // Clean up the auth listener when component unmounts
    return () => {
        unsubscribe();
    };

}, [auth]);

  return (
    <>
      {subscribed ? 
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <h1>Already Subscribed</h1>
          <button style={{marginLeft: "45%", marginRight: "45%", padding: "10px"}} onClick={()=>{
            setSubscribed(false);
          }}>Go Anyway</button>
        </div> : 
        isLoggedIn ? <Elements stripe={stripe}>
        <Payment userId={userId} param={param} cost={cost} plan={plan}></Payment>
      </Elements> : 
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <h1>Not Logged In</h1>
          <button style={{marginLeft: "45%", marginRight: "45%", padding: "10px"}} onClick={()=>{
            navigate("/login");
          }}>Log In</button>
        </div>
      }
    </>
  );
}

export default Stripe;
