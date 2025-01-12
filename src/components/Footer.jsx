import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',  // Changed to center
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body1">
                        Employee Management System © {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
