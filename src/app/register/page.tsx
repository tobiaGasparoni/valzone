"use client";
import { signUp } from "@aws-amplify/auth";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold">Register</h2>
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
      <button onClick={handleSignUp} className="mt-4 bg-green-500 text-white p-2 rounded">
        Sign Up
      </button>
      {success && <p className="text-green-500 mt-2">Check your email for confirmation.</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
