export const logout = (navigate) => {
    localStorage.removeItem('token'); // Remove JWT token
    localStorage.removeItem('role'); // Remove role
    navigate('/login'); // Redirect to login page
};
