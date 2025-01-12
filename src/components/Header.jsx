import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    >
                        EMS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                        <Button
                            color="inherit"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/')}
                        >
                            Home
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<GroupIcon />}
                            onClick={() => navigate('/employees')}
                        >
                            Employees
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<BusinessIcon />}
                            onClick={() => navigate('/departments')}
                        >
                            Departments
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<DomainIcon />}
                            onClick={() => navigate('/organizations')}
                        >
                            Organizations
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
