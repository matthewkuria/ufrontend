"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";  // Assuming you have an authentication context
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie';

export default function MembershipDisplay() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth(); // assuming you have an authentication hook
const router = useRouter();
const [membershipPlans, setMembershipPlans] = useState([]);
const [loading, setLoading] = useState(false); // For handling button state
  

 // Fetch membership plans from the backend
  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/membership-plans/");
        if (!response.ok) {
          throw new Error("Failed to fetch membership plans.");
        }
        const data = await response.json();
        setMembershipPlans(data); // Set the plans dynamically
      } catch (error) {
        console.error("Error fetching membership plans:", error);
        setMessage("Failed to load membership plans.");
      }
    };

    fetchMembershipPlans();
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) {
      setMessage("Please select a membership plan first.");
      return;
    }

    if (isAuthenticated) {
      try {
        const token = Cookies.get("access_token");
        const response = await fetch("http://127.0.0.1:8000/api/memberships/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plan_id: selectedPlan.id }),
        });

        if (!response.ok) {
          throw new Error(`Failed to complete the purchase. (${response.status})`);
        }

          setMessage("Purchase successful! Check your email for confirmation.");
          router.push("membership/membership-confirmation");
      } catch (error) {
        console.error("Error during purchase:", error);
        setMessage("Failed to complete the purchase.");
      }
    } else {
      // Redirect to login with the current page URL as the `next` query parameter
      const currentPath = window.location.pathname;
      router.push(`/login?next=${encodeURIComponent(currentPath)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Choose Your Membership Plan</h2>
        <p className="text-lg text-gray-600 mb-12">Select a plan that suits you. Gain access to exclusive benefits!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform duration-300 hover:scale-105 
                          ${selectedPlan?.id === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              <p className="text-xl font-bold text-gray-800 mt-4">Ksh{plan.price}/year</p>
              <div className="mt-4">
                <button
                  className={`w-full py-2 rounded-lg text-white ${selectedPlan?.id === plan.id ? "bg-blue-600" : "bg-gray-300 text-gray-500"}`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePurchase}
          disabled={!selectedPlan}
          className={`mt-8 py-3 px-6 rounded-lg text-white text-lg font-semibold ${selectedPlan ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Purchase {selectedPlan ? selectedPlan.name : ""}
        </button>

        {message && <p className="mt-4 text-lg text-red-600">{message}</p>}
      </div>
    </div>
  );
}
