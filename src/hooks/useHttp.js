import { useCallback } from "react";

const useHttp = () => {
  const fetchRequest = useCallback(async (req = {}) => {
    try {
      const userEmail = localStorage.getItem('email');
      const userName = userEmail && userEmail.split('@')[0];
      const endPoint = req.id ? `/${req.id}` : "";
      
      const response = await fetch(
        `https://oct-2023-a573a-default-rtdb.firebaseio.com/e-commerce/${userName}${endPoint}.json`,{
        method: req.method || 'GET',
        body: req.body ? JSON.stringify(req.body) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        console.log(errData,"custom hook")
        throw new Error(errData.error.message);
      }
      const data = await response.json();
      return data;
      
    } catch (error) {
      return error;
    }
  }, []); 

  return fetchRequest;
};

export default useHttp;
