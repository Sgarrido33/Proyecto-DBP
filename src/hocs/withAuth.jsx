import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const withAuth = (ProtectedComponent) => {
   return (props) => {
    const { user } = useUser();
    const [isAuth, setIsAuth] = React.useState(false);
    const navigate = useNavigate();

    React.useLayoutEffect(() => {
      if (!user) {
        window.location.href = '/';
        //navigate('/login')
      } else {
        //navigate('/main')
        setIsAuth(true);
      }
    }, [user, navigate]);

    return isAuth ? <ProtectedComponent {...props} /> : null;
   }
}

export default withAuth
