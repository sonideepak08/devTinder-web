import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/verify/premium', {withCredentials: true});
      
      if (res?.data?.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleMembershipEvent = async (type) => {
    try {
      const resp = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );

      const { RAZORPAY_KEY_ID, amount, orderId, notes, email } = resp.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "DevTinder",
        description: "Test Transaction",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    isUserPremium ? 
    <p>You're already a premium user</p> :
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with 100 people</li>
            <li> - 100 connections per request</li>
            <li> - Blue tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleMembershipEvent("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Unlimited connections per request</li>
            <li> - Blue tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleMembershipEvent("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
