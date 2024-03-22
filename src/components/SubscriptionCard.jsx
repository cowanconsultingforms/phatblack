import React from "react";
import { getAuth } from "firebase/auth";

function SubscriptionCard({ title, planBenefits, planAccess, backgroundColor }) {

    function redirect() {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
        if (user) {
            window.location.href = "/payment"; // Redirect to payment page if user is logged in
        } else {
            window.location.href = "/signup"; // Redirect to signup page if user is not logged in
        }
    }

    return (
        <div className="subscription-card" style={{ backgroundColor: backgroundColor }} onClick={redirect}>
            <h1 className="card-title">{title}</h1>
            
            <div className="line-container">
                <hr className="line" />
            </div>
            
            <div className="benefits">
                {planBenefits.map((benefit, index) => (
                    <h2 className="benefit" key={index}>{benefit}</h2>
                ))}
            </div>

            <div className="line-container">
                <hr className="line" />
            </div>

            <div className="accesses">
                {planAccess.map((access, index) => (
                    <h2 className="access" key={index}>{access}</h2>
                ))}
            </div>

        </div>
    );
}

export default SubscriptionCard;
