import { ReactElement, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

type authType = {
  children?: ReactElement;
  userStatus: boolean;
};
function AuthLayout({
  children,

  userStatus = false,
}: authType) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userStatus) navigate("/login");

    setLoading(false);
  }, []);

  return loading ? <div>Loading </div> : <div> {children}</div>;
}

export default AuthLayout;
