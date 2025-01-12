import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const AddOrganization = () => {
    const [err, setErr] = useState(null);
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationDescription: '',
        organizationCode: '',
    });

    const [errors, setErrors] = useState({
        organizationName: '',
        organizationDescription: '',
        organizationCode: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'organizationName':
                return value.length < 2 ? 'Organization name must be at least 2 characters' :
                    value.length > 100 ? 'Organization name must be less than 100 characters' : '';

            case 'organizationDescription':
                return value.length < 10 ? 'Description must be at least 10 characters' :
                    value.length > 500 ? 'Description must be less than 500 characters' : '';

            case 'organizationCode':
                return !/^O-\d{3}$/.test(value) ? 'Code must be in format O-000 (e.g., O-001)' : '';

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
            const response = await axios.post('http://localhost:8083/api/organizations', formData);

            if (response.status === 201 || response.status === 200) {
                setFormData({
                    organizationName: '',
                    organizationDescription: '',
                    organizationCode: '',
                });
                console.log('Organization added successfully!', response.data);
            }
        } catch (error) {


            console.error('Error adding organization:', error.response?.data || error.message);

            if (error) {
                setErr("Error adding organization, please check your input and try again. Error can be duplicate organization code");
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
                <h1>Add Organization</h1>
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
                    label="Organization Name"
                    variant="outlined"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    error={!!errors.organizationName}
                    helperText={errors.organizationName}
                    required
                />

                <TextField
                    label="Organization Description"
                    variant="outlined"
                    name="organizationDescription"
                    value={formData.organizationDescription}
                    onChange={handleChange}
                    error={!!errors.organizationDescription}
                    helperText={errors.organizationDescription}
                    multiline
                    rows={4}
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
                    size="large"
                >
                    Add Organization
                </Button>
            </Box>
        </div>
    );
};

export default AddOrganization;
