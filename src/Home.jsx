import { Box, Button, Container, TextField, Paper, Typography, Card, CardContent, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';


const Home = () => {
    const [err, setErr] = useState(null);
    const [id, setId] = useState('');
    const [employee, setEmployee] = useState();
    const navigator = useNavigate();

    const handleChange = (e) => {
        setId(e.target.value);
        setErr(null);
    };

    const handleSearch = async () => {
        try {

            handleClear();


            const response = await axios.get(`http://localhost:8081/api/employees/${id}`);
            setEmployee(response.data);
        } catch (e) {
            if (e) {
                setErr("Employee not found, please check the ID and try again");
            }
            console.log(e);
        }
    };

    const handleClear = () => {
        setEmployee(undefined);
        setId('');
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: '#1976d2',
                    mb: 4
                }}>
                    Employee Management System
                </Typography>

                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigator("/addemployee")}
                        >
                            Add Employee
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<BusinessIcon />}
                            onClick={() => navigator("/adddepartment")}
                        >
                            Add Department
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<DomainIcon />}
                            onClick={() => navigator("/addorganization")}
                        >
                            Add Organization
                        </Button>
                    </Box>
                </Paper>

                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                        <Typography variant="h6">Search Employee by ID</Typography>
                        <TextField
                            value={id}
                            onChange={handleChange}
                            size="small"
                            placeholder="Enter ID"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                            disabled={!id}
                        >
                            Search
                        </Button>

                    </Box>
                </Paper>

                {employee && (
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    General Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <DetailItem label="First Name" value={employee?.employeeDto?.firstName} />
                                    <DetailItem label="Last Name" value={employee?.employeeDto?.lastName} />
                                    <DetailItem label="Employee ID" value={employee?.employeeDto?.id} />
                                    <DetailItem label="Email" value={employee?.employeeDto?.email} />
                                    <DetailItem label="Department Code" value={employee?.employeeDto?.departmentCode} />
                                    <DetailItem label="Organization Code" value={employee?.employeeDto?.organizationCode} />
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h5" color="primary" gutterBottom>
                                    Department Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <DetailItem label="Department Name" value={employee?.departmentDto?.departmentName} />
                                    <DetailItem label="Department Description" value={employee?.departmentDto?.departmentDescription} />
                                    <DetailItem label="Department Code" value={employee?.departmentDto?.departmentCode} />
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h5" color="primary" gutterBottom>
                                    Organization Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <DetailItem label="Organization Name" value={employee?.organizationDto?.organizationName} />
                                    <DetailItem label="Organization Description" value={employee?.organizationDto?.organizationDescription} />
                                    <DetailItem label="Organization Code" value={employee?.organizationDto?.organizationCode} />
                                </Grid>

                                <Box display="flex" justifyContent="center" mt={5}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleClear}
                                    >
                                        Clear Results
                                    </Button>
                                </Box>


                            </Box>
                        </CardContent>
                    </Card>


                )}

                <Typography
                    color="error"
                    sx={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        textAlign: 'center'
                    }}
                >
                    {err}
                </Typography>

            </Box>
        </Container>
    );
};

// Helper component for displaying details
const DetailItem = ({ label, value }) => (
    <Grid item xs={12} sm={6} md={4}>
        <Box sx={{
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            height: '100%'
        }}>
            <Typography variant="subtitle2" color="textSecondary">
                {label}
            </Typography>
            <Typography variant="body1">
                {value || 'N/A'}
            </Typography>
        </Box>
    </Grid>
);

export default Home;
