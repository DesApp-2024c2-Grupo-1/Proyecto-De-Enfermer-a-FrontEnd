import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { registrarDocente } from "../services/DocenteService";
import { Stack, Box, Snackbar, Grid, Alert } from "@mui/material";
import { Input } from "../components/Input";
import "../index.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = async () => {
    let errorList = [];

    // Verificar si las contraseñas coinciden
    if (password !== confirmarPassword) {
      errorList.push("Las contraseñas no coinciden");
    }

    if (errorList.length > 0) {
      setError(errorList);
      setOpenSnackbar(true);
    }

    setError([]);

    const docenteData = { nombre, apellido, email, dni: Number(dni), password };

    try {
      await registrarDocente(docenteData);
      navigate("/registroDocenteExitoso");
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al registrar docente";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {/* <div className="alineacion">
        <img src="../assets/profile.png" className="bordePerfil" />
        <div className="recuadroTexto2">
          <FormInput
            type="name"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="recuadroInputs"
            icono="user"
          />
          <FormInput
            type="apellido"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="recuadroInputs"
            icono="user"
          />
          <FormInput
            type="dni"
            placeholder="Ingrese su DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="recuadroInputs"
            icono="address-card"
          />
          <FormInput
            type="email"
            placeholder="nombre@apellido.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="recuadroInputs"
            icono="envelope"
          />
          <FormInput
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="recuadroInputs"
            icono="lock"
          />
          <FormInput
            type="password"
            placeholder="Repita su contraseña"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            className="recuadroInputs"
            icono="lock"
          />
          <div id="espaciojaja"></div>

          <button onClick={handleRegister} className="botonClaro">
            Registrate
          </button>
        </div>
        <div>
          <img
            src="../assets/unahur-logo-figma-sf.png"
            className="unahur-logo"
            alt="Logo UNAHUR"
          />
        </div>
      </div>
      */}

<Stack
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}
>
  <Stack
    className="stack-animacion stack-target"
    sx={{
      height: "700px",
      width: "600px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.87)",
      borderRadius: "20px",
      boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
    }}
    spacing={2}
  >
    <Box
      sx={{
        width: "130px",
        height: "130px",
        backgroundColor: "#429870",
        borderRadius: "50%",
        zIndex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
        color: "rgba(255, 255, 255, 0.87)",
      }}
    >
      <i className="fa fa-user" style={{ fontSize: "60px" }}></i>
    </Box>

    <Grid container spacing={1.65} sx={{ width: "80%"}}>
      <Grid item xs={12} sm={5.86}>
        <Input
          placeholder={"Ingrese su nombre"}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          icon={"user"}
        />
      </Grid>
      <Grid item xs={12} sm={5.86}>
        <Input
          placeholder={"Ingrese su apellido"}
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          icon={"user"}
        />
      </Grid>
      <Grid item xs={12} sm={5.86}>
        <Input
          placeholder={"Ingrese su DNI"}
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          icon={"id-card"}
        />
      </Grid>
      <Grid item xs={12} sm={5.86}>
        <Input
          placeholder={"Ingrese su email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={"envelope"}
        />
      </Grid>
      <Grid item xs={12} sm={5.86}>
        <Input
          placeholder={"Ingrese su contraseña"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={"key"}
        />
      </Grid>
      <Grid item xs={12} sm={5.86}>
        <Input
          placeholder={"Repita su contraseña"}
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          icon={"key"}
        />
      </Grid>
    </Grid>

    <button onClick={handleRegister} className="botonClaro">
      Registrarme
    </button>
  </Stack>
</Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          width: { xs: "100%", md: "75%", lg: "61%" },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "60%" }}
        >
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </Alert>
      </Snackbar>
    </>
  );
}
