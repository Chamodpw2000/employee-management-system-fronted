import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {

    const [error, setError] = useState(null);


    const { id } = useParams();

    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        employeeDto: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            departmentCode: '',
            organizationCode: ''
        }
    });

    const getEmployee = async (employeeId) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/employees/${employeeId}`);
            setEmployee(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            employeeDto: {
                ...prev.employeeDto,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(employee.employeeDto);
            await axios.put(`http://localhost:8081/api/employees/updateemployee/${id}`, employee.employeeDto);
            navigate('/employees');
        } catch (error) {
            if (error) {
                setError("Error updating employee, please check your input and try again. Error can be duplicate email");
            }
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getEmployee(id);
        }
    }, [id]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Edit Employee
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Employee ID"
                        name="id"
                        value={employee?.employeeDto?.id || ''}
                        disabled
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="firstName"
                        value={employee?.employeeDto?.firstName || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="lastName"
                        value={employee?.employeeDto?.lastName || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={employee?.employeeDto?.email || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Department"
                        name="departmentCode"
                        value={employee?.employeeDto?.departmentCode || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Organization Code"
                        name="organizationCode"
                        value={employee?.employeeDto?.organizationCode || ''}
                        onChange={handleInputChange}
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Typography
                            color="error"
                            sx={{ flexGrow: 1, alignSelf: 'center' }}
                        >
                            {error}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/employees')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditEmployee;
