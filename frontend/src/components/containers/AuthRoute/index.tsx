import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";

function AuthRoute({ children, isAdmin }: { children: ReactNode, isAdmin?: boolean }) {
  const { isAuth, userIsAdmin } = useContext(AuthContext);

  return (() => {
		if (isAuth) {
			if (isAdmin && !userIsAdmin) {
				return <Navigate to={'/'} />;
			} else {
				return <>{children}</>;
			}
		} else {
			return <Navigate to={'/'} />;
		}
	})();
}

export default AuthRoute;
