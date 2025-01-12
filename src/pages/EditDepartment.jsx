import { Button, TextField, Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [department, setDepartment] = useState({
        departmentName: '',
        departmentCode: '',
        departmentDescription: '',
        id: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchDepartment = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/departments/${id}`);
            setDepartment({
                departmentName: response.data.departmentName,
                departmentCode: response.data.departmentCode,
                departmentDescription: response.data.departmentDescription,
                id: response.data.id
            });
        } catch (error) {
            console.error('Error fetching department:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            console.log(department);

            await axios.put(`http://localhost:8080/api/departments/updatedepartment/${id}`, department);
            navigate('/departments');
        } catch (error) {
            if (error) {
                setError("Error updating department, please check your input and try again. Error can be duplicate department code");
            }
            console.error('Error updating department:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchDepartment(id);
        }
    }, [id]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Edit Department
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Department ID"
                        name="id"
                        value={department.id || ''}
                        disabled
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Department Name"
                        name="departmentName"
                        value={department.departmentName || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Department Code"
                        name="departmentCode"
                        value={department.departmentCode || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="departmentDescription"
                        value={department.departmentDescription || ''}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
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
                            onClick={() => navigate('/departments')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditDepartment;
