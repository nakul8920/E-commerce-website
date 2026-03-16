import { Box, Typography, Grid, styled, Link as MuiLink } from '@mui/material';

const FooterContainer = styled(Box)`
  background: #E3DBBB;
  padding: 40px 80px;
  margin-top: 40px;
`;

const SectionTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 12px;
  color: #41431B;
`;

const FooterLink = styled(MuiLink)`
  display: block;
  margin-bottom: 8px;
  color: #41431B;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #AEB784;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <SectionTitle>About</SectionTitle>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">CandyShop Stories</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <SectionTitle>Help</SectionTitle>
          <FooterLink href="#">Payments</FooterLink>
          <FooterLink href="#">Shipping</FooterLink>
          <FooterLink href="#">Cancellation & Returns</FooterLink>
          <FooterLink href="#">FAQ</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <SectionTitle>Policy</SectionTitle>
          <FooterLink href="#">Return Policy</FooterLink>
          <FooterLink href="#">Terms Of Use</FooterLink>
          <FooterLink href="#">Security</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <SectionTitle>Social</SectionTitle>
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">YouTube</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={4}>
        <Typography variant="caption" color="textSecondary">
          © {new Date().getFullYear()} CandyShop Clone. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
