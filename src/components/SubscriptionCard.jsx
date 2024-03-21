import React from "react";

function SubscriptionCard({ title, planBenefits, planAccess, backgroundColor }) {
    return (
        <div className="subscription-card" style={{ backgroundColor: backgroundColor }}>
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
