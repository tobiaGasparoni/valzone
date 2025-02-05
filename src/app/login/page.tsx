"use client";
import { signIn } from "@aws-amplify/auth"
import { AuthError } from '@aws-amplify/auth';
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn({ username: email, password });
      alert("Logged in successfully!");
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        switch (error.name) {
          case 'InitiateAuthException':
            setError(error.message || 'Authentication initiation failed');
            break;
          case 'RespondToAuthChallengeException':
            setError(error.message || 'Auth challenge failed');
            break;
          case 'AuthValidationErrorCode':
            setError(error.message || 'Validation error during sign in');
            break;
          case 'AuthTokenConfigException':
            setError(error.message || 'Invalid token configuration');
            break;
          default:
            setError(error.message || 'An unexpected auth error occurred');
        }
      } else {
        setError(error.message || 'An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mt-2"
      />
      <button onClick={handleSignIn} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
