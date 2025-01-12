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
    Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import { Fingerprint } from '@mui/icons-material';

const Departments = () => {
    const [departments, setDepartment] = useState([]);
    const navigate = useNavigate();
    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/departments');
            setDepartment(response.data);
        } catch (error) {
            console.error(error);
        }
    };





    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editdepartment/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await axios.delete(`http://localhost:8080/api/departments/deletedepartment/${id}`);
                fetchDepartments();
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
                Department Directory
            </Typography>

            <Grid container spacing={3}>
                {departments.map((department) => (
                    <Grid item xs={12} sm={6} md={4} key={department.id}>
                        <Card
                            elevation={3}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}
                        >
                            <CardContent>

                               
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <BusinessIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6" component="h2">
                                        {department.departmentName}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ my: 2 }}>

                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                        <Fingerprint sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                           Dept Id: {department.id}
                                        </Typography>
                                    </Box>
                                

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                        <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Dept Code: {department.departmentCode}
                                        </Typography>
                                    </Box>


                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                        <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Dept Description: {department.departmentDescription}
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
                                        onClick={() => handleEdit(department.departmentCode)}
                                        sx={{ mr: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(department.id)}
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

export default Departments;
