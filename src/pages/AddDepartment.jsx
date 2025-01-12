import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {

    const navigate = useNavigate();
    const [err, settErr] = useState(null);

    const [formData, setFormData] = useState({
        departmentName: '',
        departmentDescription: '',
        departmentCode: '',
    });

    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: '',
        departmentCode: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'departmentName':
                return value.length < 2 ? 'Department name must be at least 2 characters' :
                    value.length > 50 ? 'Department name must be less than 50 characters' : '';

            case 'departmentDescription':
                return value.length < 10 ? 'Description must be at least 10 characters' :
                    value.length > 200 ? 'Description must be less than 200 characters' : '';

            case 'departmentCode':
                return !/^[A-Z]-\d{3}$/.test(value) ? 'Code must be in format X-000 (e.g., C-001)' : '';

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
            const response = await axios.post('http://localhost:8080/api/departments', formData);

            if (response.status === 201 || response.status === 200) {
                setFormData({
                    departmentName: '',
                    departmentDescription: '',
                    departmentCode: '',
                });
                console.log('Department added successfully!', response.data);
                navigate('/departments');

            }
        } catch (error) {
            console.error('Error adding department:', error.response?.data || error.message);
            if (error) {
                settErr("Error adding department, please check your input and try again. Error can be duplicate department code");
            }
        }
    };

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <h1>Add Department</h1>
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
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <TextField
                    label="Department Name"
                    variant="outlined"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                    error={!!errors.departmentName}
                    helperText={errors.departmentName}
                    required
                />

                <TextField
                    label="Department Description"
                    variant="outlined"
                    name="departmentDescription"
                    value={formData.departmentDescription}
                    onChange={handleChange}
                    error={!!errors.departmentDescription}
                    helperText={errors.departmentDescription}
                    multiline
                    rows={4}
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
                    size="large"
                >
                    Add Department
                </Button>
            </Box>
        </div>
    );
};

export default AddDepartment;
