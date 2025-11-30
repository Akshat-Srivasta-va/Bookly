import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
 const isAuthenticated = false; // Replace with actual authentication logic
 const loading = false; // Replace with actual loading state
 const location = useLocation

 if(loading) {
  // you can add a loading spinner here if you want
  return <div>Loading...</div>;
 }

  if(!isAuthenticated) { 
    return <Navigate to="/login" state={{from: location}} replace/>
  }
  return children;
}

export default ProtectedRoute