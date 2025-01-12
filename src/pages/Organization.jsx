import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    IconButton,
    Box,
    Divider,
    Chip,
    Paper
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DomainIcon from '@mui/icons-material/Domain';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import { Fingerprint } from '@mui/icons-material';

const Organization = () => {
    const [organization, setOrganization] = useState([]);
    const navigate = useNavigate();

    const fetchOrganization = async () => {
        try {
            const response = await axios.get('http://localhost:9191/api/organizations');
            setOrganization(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchOrganization();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editorganization/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this organization?')) {
            try {
                await axios.delete(`http://localhost:8083/api/organizations/deleteorganization/${id}`);
                fetchOrganization();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>

            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    mb: 4
                }}

            >
                <BusinessIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
                Organization Directory
            </Typography>


            <Grid container spacing={3}>
                {organization.map((org) => (
                    <Grid item xs={12} sm={6} md={4} key={org.id}>
                        <Card
                            elevation={3}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <DomainIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6" component="h2">
                                        {org.organizationName}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ my: 2 }}>
                                    

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                        <Fingerprint sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Org Id: {org.id}
                                        </Typography>
                                    </Box>


                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                        <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Org Code: {org.organizationCode}
                                        </Typography>
                                    </Box>


                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                        <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Org Description: {org.organizationDescription}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 'auto',
                                    pt: 2
                                }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(org.organizationCode)}
                                        sx={{ mr: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(org.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Organization;
