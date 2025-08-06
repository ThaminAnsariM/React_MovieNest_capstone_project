import { SignIn } from "@clerk/clerk-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import Layout from "../../pages/Admin/Layout";
import { useNavigate } from "react-router";

const ProtectedAdminRoute = () => {
  const { user, isAdmin, adminChecked } = useAppContext();
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminChecked && user && !isAdmin && !toastShown) {
      toast.error("Access Denied: Admins Only");
      setToastShown(true);
      navigate("/"); // 👈 Redirect to home page
    }
  }, [adminChecked, user, isAdmin, toastShown, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SignIn fallbackRedirectUrl="/admin" />
      </div>
    );
  }

  if (!adminChecked) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Checking admin access...</p>
      </div>
    );
  }

  if (isAdmin) {
    return <Layout />;
  }

  // Optional fallback if redirect fails (can also return null)
  return null;
};

export default ProtectedAdminRoute;
