import React from "react";
import SubscriptionCard from "../components/SubscriptionCard";
import "../Styles/Subscribe.css"

function Subscribe() {
    const subscriptionData = [
        {
            path: "/stripe/trial", 
            title: "1 Month Free Trial",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["1 Month Free Trial" , "Then $1/Month", "Cancel Anytime"],
            backgroundColor: "#212529",
            restrictions: "Restrictions Apply"
        },
        {
            path: "/stripe/monthly",
            title: "$1.00",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["Recurring Monthly", "Cancel Anytime"],
            backgroundColor: "#2d3338",
            restrictions: "Restrictions Apply"
        },
        {
            path: "/stripe/yearly",
            title: "$10.80",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["Save 10% Compared to Monthly", "Recurring Yearly", "Cancel Anytime"],
            backgroundColor: "#ffa646",
            restrictions: "Restrictions Apply"
        },
        {
            path: "/stripe/nft",
            title: "$1000",
            planBenefits: ["Unlimited Access to All Content", "Instant Delivery of Global News", "Stream On-Demand Shows 24/7"],
            planAccess: ["NFT", "Lifetime Access", "Cancel Anytime"],
            backgroundColor: "#ED7D31",
            restrictions: "Restrictions Apply"
        },
    ];

    return (
        <div className="subscribe-page">

            <div className="subscribe-header">
                <h1>Subscribe</h1>
            </div>

            <div className="subscription-plans">
                {subscriptionData.map((card, index) => (
                    <SubscriptionCard
                        key={index}
                        path={card.path}
                        title={card.title}
                        planBenefits={card.planBenefits}
                        planAccess={card.planAccess}
                        backgroundColor={card.backgroundColor}
                        restrictions={card.restrictions}
                    />
                ))}
            </div>
        </div>
    )
}

export default Subscribe;
