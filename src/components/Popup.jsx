import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import "./Popup.css";

function Popup() {
    const [isOpen, setIsOpen] = useState(false);
    const auth = getAuth();
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const getUserRole = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists() && ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor'].includes(userDoc.data().role)) {
                        setSubscribed(true);
                    } else {
                        setSubscribed(false);
                    }
                } else {
                    setSubscribed(false);
                }
            });
        };

        getUserRole();

    }, [auth]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000); // Show the popup after 2 seconds

        // Clear the timer on component unmount or when the popup is shown
        return () => clearTimeout(timer);
    }, []); // Only run once on component mount

    const handleOnclick = () => {
        window.location.href = "/login";
    };

    useEffect(() => {
        const handleClick = () => {
            setIsOpen(true);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (isOpen && !subscribed) {
            window.scrollTo(0, 0); // Scroll to the top when the popup shows
        }
    }, [isOpen]);

    return (
        <div>
            {subscribed ?
                <div className="popup-container">
                        <div className={`transparent-overlay ${isOpen ? 'open' : ''}`}></div>
                        <div className={`subscription-wall ${isOpen ? 'open' : ''}`}>
                            <h1>Sign up, or log in.</h1>
                            <p>Gain access to limited free articles, news alerts, select newsletters, podcasts, and some daily games.</p>
                            <button onClick={handleOnclick}>Log In</button>
                        </div>
                </div>
                :
                <div>
                </div>
            }
        </div>


    );
}

export default Popup;
