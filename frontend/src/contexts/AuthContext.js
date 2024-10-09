import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseConfig } from '../components/Form/firebaseauth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    const app = initializeApp(firebaseConfig); // Initialize once
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const signUpWithEmail = async (email, password, username) => {
        setAuthLoading(true);
        setAuthError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            setUser(newUser);

            const userData = {
                User: {
                    Personal_info: {
                        Email: email,
                        Username: username || null,
                    },
                    Skills: {
                        teaching_skills: [],
                        learning_skills: [],
                    },
                },
            };

            await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            navigate('/'); // Navigate to home page after successful signup
        } catch (error) {
            console.error('Error signing up:', error.message);
            setAuthError(error.message); // Set error state to inform the UI
        } finally {
            setAuthLoading(false);
        }
    };

    const signInWithEmail = async (email, password) => {
        setAuthLoading(true);
        setAuthError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            navigate('/'); // Navigate to home page on successful login
        } catch (error) {
            console.error('Error signing in:', error.message);
            setAuthError(error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const signUpWithGoogle = async () => {
        setAuthLoading(true);
        setAuthError(null);

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;
            setUser(googleUser);
            localStorage.setItem('loggedInUserId', googleUser.uid);
            navigate('/'); // Navigate to home page after successful Google sign-in
        } catch (error) {
            console.error('Error with Google sign-in:', error.message);
            setAuthError(error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        setAuthLoading(true);

        try {
            await signOut(auth);
            setUser(null); // Clear the user state after sign out
            navigate('/signin'); // Redirect to the sign-in page
        } catch (error) {
            console.error('Error signing out:', error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authLoading,
                authError,
                signUpWithEmail,
                signInWithEmail,
                signUpWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
