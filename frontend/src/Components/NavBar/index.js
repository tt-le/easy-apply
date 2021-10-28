import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import logo from "./easy-apply_logo.jpg";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#2b2b2b' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} className="logo"/>
          </Typography>
          <Button color="inherit"  href="/jobboard" style={{ color: "#00FECF" }}>
            Home<HomeIcon></HomeIcon>
          </Button>
          <Button color="inherit"  href="/profile" style={{ color: "#00FECF" }}>
            Profile<AccountCircleIcon></AccountCircleIcon>
          </Button>
          <Button color="inherit" style={{ color: "#00FECF" }}>
            History<HistoryIcon></HistoryIcon>
          </Button>
          <Button color="inherit" style={{ color: "#00FECF" }}>
            About<InfoIcon></InfoIcon>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}