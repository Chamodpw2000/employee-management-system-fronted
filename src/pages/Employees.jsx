import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    Grid,
    Button,
    IconButton,
    Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';
import { useNavigate } from 'react-router-dom';
import { Fingerprint } from '@mui/icons-material';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/editemployee/${id}`);
    };

    const handleDelete = async (id) => {

        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:8081/api/employees/deleteemployee/${id}`);
                fetchEmployees(); // Refresh the list
            } catch (error) {
                console.log(error);
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
                Registered Employees
            </Typography>

            <Grid container spacing={3}>
                {employees.map((employee) => (
                    <Grid item xs={12} sm={6} md={4} key={employee.id}>
                        <Card
                            elevation={3}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {employee.firstName} {employee.lastName}
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ my: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Fingerprint sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2">
                                            Employee Id: {employee.id}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2">
                                            Employee Email: {employee.email}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2">
                                            Employee Dept: {employee.departmentCode}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <DomainIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2">
                                            Employee Org: {employee.organizationCode}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 2
                                }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(employee.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(employee.id)}
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

export default Employees;
