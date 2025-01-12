import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./Home";
import AddEmployee from "./pages/AddEmployee";
import AddDepartment from "./pages/AddDepartment";
import AddOrganization from "./pages/AddOrganization";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Organization from "./pages/Organization";
import EditEmployee from "./pages/EditEmployee";
import EditOrganization from "./pages/EditOrganization";
import EditDepartment from "./pages/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <Header />
        
        <Box component="main" sx={{ 
          flexGrow: 1, 
          py: 3,
          px: 2,
          backgroundColor: '#f5f5f5'
        }}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/addemployee" element={<AddEmployee/>} />
            <Route path="/adddepartment" element={<AddDepartment/>} />
            <Route path="/addorganization" element={<AddOrganization/>} />
            <Route path="/employees" element={<Employees/>} />
            <Route path="/departments" element={<Departments/>} />
            <Route path="/organizations" element={<Organization/>} />
            <Route path="/editemployee/:id" element={<EditEmployee/>} />
            <Route path="/editdepartment/:id" element={<EditDepartment/>} />
            <Route path="/editorganization/:id" element={<EditOrganization/>} />











          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
