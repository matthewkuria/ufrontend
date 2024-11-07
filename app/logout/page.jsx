'use client';
import { useRouter } from 'next/navigation';
import BounceLoader from "react-spinners/BounceLoader";
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const LogoutPage = () => {
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        // Call the logout function from the context
        logout();
        // Redirect to the homepage or login page after logging out
        router.push('/login'); // Change this to '/' if you want to redirect to home
    }, [logout, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BounceLoader size={100}   color="hsla(217, 90%, 48%, 1)" speedMultiplier={3}/>
        </div>
    );
};

export default LogoutPage;
