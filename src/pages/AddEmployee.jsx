import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {

    const navigate = useNavigate();

    const [err, setErr] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        departmentCode: '',
        organizationCode: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        departmentCode: '',
        organizationCode: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.length < 2 ? 'Must be at least 2 characters' :
                    value.length > 50 ? 'Must be less than 50 characters' :
                        !/^[a-zA-Z\s]*$/.test(value) ? 'Only letters are allowed' : '';

            case 'email':
                return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ? 'Invalid email address' : '';

            case 'departmentCode':
            case 'organizationCode':
                return value.length < 2 ? 'Must be at least 2 characters' :
                    value.length > 10 ? 'Must be less than 10 characters' : '';

            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        try {
            await axios.post('http://localhost:8081/api/employees', formData)
                .then((res) => {
                    console.log(res.data);
                    navigate('/employees');
                })
                .catch((err) => {
                    console.error(err);

                    if (err) {
                        setErr("Error adding employee, please check your input and try again. Error can be duplicate email");
                    }
                });

        } catch (e) {

            console.log(e)
            alert('Failed to add employee');
        }

    };

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <h1>Add Employee</h1>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: 'auto',
                    mt: 4,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                }}
            >
                <TextField
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                />

                <TextField
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                />

                <TextField
                    label="Department Code"
                    variant="outlined"
                    name="departmentCode"
                    value={formData.departmentCode}
                    onChange={handleChange}
                    error={!!errors.departmentCode}
                    helperText={errors.departmentCode}
                    required
                />

                <TextField
                    label="Organization Code"
                    variant="outlined"
                    name="organizationCode"
                    value={formData.organizationCode}
                    onChange={handleChange}
                    error={!!errors.organizationCode}
                    helperText={errors.organizationCode}
                    required
                />

                <Typography
                    color="error"
                    sx={{ flexGrow: 1, alignSelf: 'center' }}
                >
                    {err}
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default AddEmployee;
