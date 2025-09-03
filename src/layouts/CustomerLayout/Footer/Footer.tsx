import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton,
  Stack,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Phone,
  Email,
  LocationOn,
  Copyright,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledFooter = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.grey[900]} 0%, 
    ${theme.palette.grey[800]} 50%, 
    ${theme.palette.grey[900]} 100%)`,
  color: theme.palette.common.white,
  marginTop: "auto",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: `linear-gradient(90deg, 
      transparent 0%, 
      ${theme.palette.primary.main} 50%, 
      transparent 100%)`,
  },
}));

const FooterSection = styled(Paper)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.spacing(2),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.05),
    transform: "translateY(-4px)",
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`,
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  marginBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: 0,
    width: "40px",
    height: "3px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: "2px",
  },
}));

const FooterLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "component",
})(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.8),
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
  cursor: "pointer",
  display: "block",
  padding: theme.spacing(0.5, 0),
  position: "relative",
  "&:hover": {
    color: theme.palette.primary.light,
    transform: "translateX(8px)",
    textDecoration: "none",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: "-16px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "0",
    height: "2px",
    background: theme.palette.primary.main,
    transition: "width 0.3s ease",
  },
  "&:hover::before": {
    width: "12px",
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.common.white, 0.1),
  color: theme.palette.common.white,
  margin: theme.spacing(0.5),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  "&:hover": {
    background: theme.palette.primary.main,
    transform: "translateY(-3px) scale(1.1)",
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
  "&.facebook:hover": {
    background: "#1877F2",
  },
  "&.instagram:hover": {
    background: "linear-gradient(45deg, #F56040 0%, #E1306C 50%, #833AB4 100%)",
  },
  "&.twitter:hover": {
    background: "#1DA1F2",
  },
  "&.youtube:hover": {
    background: "#FF0000",
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1.5),
  color: alpha(theme.palette.common.white, 0.8),
  transition: "all 0.3s ease",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.05),
    color: theme.palette.primary.light,
    transform: "translateX(4px)",
  },
}));

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const aboutUsLinks = [
    { label: "Giới thiệu HypeCat", to: "/about-us" },
    { label: "Tuyển dụng", to: "/careers" },
    { label: "Tin tức & Sự kiện", to: "/news" },
    { label: "Chính sách bảo mật", to: "/privacy-policy" },
    { label: "Điều khoản sử dụng", to: "/terms-of-service" },
  ];

  const supportLinks = [
    { label: "Chính sách vận chuyển", to: "/shipping-policy" },
    { label: "Quy định thanh toán", to: "/payment-policy" },
    { label: "Chính sách bảo hành", to: "/warranty-policy" },
    { label: "Đổi trả & Hoàn tiền", to: "/return-policy" },
    { label: "Giải quyết khiếu nại", to: "/complaint-policy" },
    { label: "Hướng dẫn mua hàng", to: "/shopping-guide" },
  ];

  return (
    <StyledFooter as="footer">
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid size={{ mobile: 12, tablet: 6, laptop: 3 }}>
            <FooterSection>
              <FooterTitle variant="h6">VỀ CHÚNG TÔI</FooterTitle>
              <Stack spacing={0.5}>
                {aboutUsLinks.map((link, index) => (
                  <FooterLink key={index} href={link.to} as={Link}>
                    {link.label}
                  </FooterLink>
                ))}
              </Stack>
            </FooterSection>
          </Grid>

          {/* Customer Support Section */}
          <Grid size={{ mobile: 12, tablet: 6, laptop: 3 }}>
            <FooterSection>
              <FooterTitle variant="h6">HỖ TRỢ KHÁCH HÀNG</FooterTitle>
              <Stack spacing={0.5}>
                {supportLinks.map((link, index) => (
                  <FooterLink key={index} href={link.to} as={Link}>
                    {link.label}
                  </FooterLink>
                ))}
              </Stack>
            </FooterSection>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ mobile: 12, tablet: 6, laptop: 3 }}>
            <FooterSection>
              <FooterTitle variant="h6">LIÊN HỆ</FooterTitle>
              <Stack spacing={1}>
                <ContactInfo>
                  <LocationOn
                    sx={{ mr: 2, color: theme.palette.primary.light }}
                  />
                  <Typography variant="body2">
                    123 Đường ABC, Quận 1, TP.HCM
                  </Typography>
                </ContactInfo>
                <ContactInfo>
                  <Phone sx={{ mr: 2, color: theme.palette.primary.light }} />
                  <Typography variant="body2">Hotline: 1900 xxxx</Typography>
                </ContactInfo>
                <ContactInfo>
                  <Email sx={{ mr: 2, color: theme.palette.primary.light }} />
                  <Typography variant="body2">
                    Email: info@hypecat.com
                  </Typography>
                </ContactInfo>
              </Stack>
            </FooterSection>
          </Grid>

          {/* Social Media & Newsletter */}
          <Grid size={{ mobile: 12, tablet: 6, laptop: 3 }}>
            <FooterSection>
              <FooterTitle variant="h6">KẾT NỐI VỚI CHÚNG TÔI</FooterTitle>
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  color: alpha(theme.palette.common.white, 0.7),
                  lineHeight: 1.6,
                }}
              >
                Theo dõi chúng tôi để cập nhật những sản phẩm và ưu đãi mới
                nhất!
              </Typography>

              <Box sx={{ mb: 3 }}>
                <SocialIconButton className="facebook" size="small">
                  <Facebook />
                </SocialIconButton>
                <SocialIconButton className="instagram" size="small">
                  <Instagram />
                </SocialIconButton>
                <SocialIconButton className="twitter" size="small">
                  <Twitter />
                </SocialIconButton>
                <SocialIconButton className="youtube" size="small">
                  <YouTube />
                </SocialIconButton>
              </Box>

              {/* App Download */}
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  color: alpha(theme.palette.common.white, 0.8),
                  fontWeight: 600,
                }}
              >
                Tải ứng dụng HypeCat
              </Typography>
              <Stack direction="row" spacing={1}>
                <Box
                  component="img"
                  src="/api/placeholder/120/40"
                  alt="Download on App Store"
                  sx={{
                    height: 40,
                    borderRadius: 1,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
                <Box
                  component="img"
                  src="/api/placeholder/120/40"
                  alt="Get it on Google Play"
                  sx={{
                    height: 40,
                    borderRadius: 1,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              </Stack>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            my: 4,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${alpha(theme.palette.common.white, 0.3)} 50%, 
              transparent 100%)`,
            height: "1px",
          }}
        />

        {/* Copyright Section */}
        <Box
          sx={{
            textAlign: "center",
            background: alpha(theme.palette.common.white, 0.03),
            borderRadius: 2,
            py: 3,
            px: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Copyright sx={{ mr: 1, color: theme.palette.primary.light }} />
              <Typography
                variant="body2"
                sx={{ color: alpha(theme.palette.common.white, 0.8) }}
              >
                {currentYear} HypeCat. Tất cả quyền được bảo lưu.
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.common.white, 0.6),
                fontStyle: "italic",
              }}
            >
              Được phát triển với ❤️ tại Việt Nam
            </Typography>
          </Stack>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
