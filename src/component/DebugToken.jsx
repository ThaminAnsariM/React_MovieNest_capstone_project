import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function DebugToken() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        console.log("Clerk Token:", token);
      }
    };
    fetchToken();
  }, [isSignedIn, getToken]);

  return <div>Check console for token</div>;
}

export default DebugToken;
