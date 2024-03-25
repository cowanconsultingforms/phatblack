import React from "react";
import SubscriptionCard from "../components/SubscriptionCard";
import "../Styles/Subscribe.css"

function Subscribe() {
    const subscriptionData = [
        {
            title: "1 Month Free Trial",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["Recurring Monthly"],
            backgroundColor: "green"
        },
        {
            title: "$1.00 USD",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["Recurring Monthly"],
            backgroundColor: "#213372"
        },
        {
            title: "$10.80",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["Save 10% Compared to Monthly", "Recurring Yearly"],
            backgroundColor: "#B18149"
        },
        {
            title: "NFT",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["Lifetime Access"],
            backgroundColor: "#47185C"
        },
    ];

    return (
        <div className="subscribe-page">

            <div className="subscribe-header">
                <h1>Phatblack Premium</h1>
            </div>

            <div className="subscription-plans">
                {subscriptionData.map((card, index) => (
                    <SubscriptionCard
                        key={index}
                        title={card.title}
                        planBenefits={card.planBenefits}
                        planAccess={card.planAccess}
                        backgroundColor={card.backgroundColor}
                    />
                ))}
            </div>
        </div>
    )
}

export default Subscribe;
