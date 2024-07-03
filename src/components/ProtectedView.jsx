export default function ProtectedView() {
    const ProtectedRoute = ({
        isAllowed,
        redirectPath = '/inaccessible',
        children,
      }) => {
        if (!isAllowed) {
          return <Navigate to={redirectPath} replace />;
        }
        return children ? children : <Outlet />;
      };
  }
  
