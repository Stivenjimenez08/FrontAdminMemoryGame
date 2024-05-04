import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "../../../../style.css";

export const ShowProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({ userName: "", email: "" }); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_SERVER}/api/user/userById/${user?.id}`
        );
        
        if (response.data.users.length > 0) {
          setUserData(response.data.users[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData(); 
  }, [user]);
  
  const handleEdit = () => {
    navigate("/EditUser");
  };

  const handleEditPassword = () => {
    navigate("/EditPassword");
  };

  return (
    <div className="formProfile">
      <h2>MI PERFIL</h2>
      <form>
        <div className="contentTexfield">
          <TextField
            id="userName"
            name="userName"
            label="Nombre de usuario"
            variant="standard"
            value={userData.userName} 
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="email"
            name="email"
            label="Correo electrónico"
            variant="standard"
            value={userData.email} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="contentTexfield"> 
          <Button id="btnProfile" onClick={handleEditPassword}>
            Actualizar Contraseña
          </Button>
        </div>
      </form>
    </div>
  );
};

