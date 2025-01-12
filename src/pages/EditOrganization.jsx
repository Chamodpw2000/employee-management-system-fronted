import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrganization = () => {
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [organization, setOrganization] = useState({
        organizationName: '',
        organizationCode: '',
        organizationDescription: '',
        id: ''
    });

    const fetchOrganization = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8083/api/organizations/${id}`);
            setOrganization(response.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching organization:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrganization(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8083/api/organizations/updateorganization/${id}`, organization);
            navigate('/organizations');
        } catch (error) {
            if(error){
                setError("Error updating organization, please check your input and try again. Error can be duplicate organization code");
            }

            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrganization(id);
        }
    }, [id]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Edit Organization
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Organization ID"
                        name="id"
                        value={organization.id}
                        disabled
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Organization Name"
                        name="organizationName"
                        value={organization.organizationName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Organization Code"
                        name="organizationCode"
                        value={organization.organizationCode}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="organizationDescription"
                        value={organization.organizationDescription}
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
                            onClick={() => navigate('/organizations')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditOrganization;
