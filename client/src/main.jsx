import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import "./index.css";   // ⭐ IMPORTANT (Tailwind CSS import)

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <ClerkProvider publishableKey={clerkPubKey}>

      <BrowserRouter>

        <CartProvider>

          <App />

        </CartProvider>

      </BrowserRouter>

    </ClerkProvider>

  </React.StrictMode>

);