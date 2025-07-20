import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";

const IntroductionHypeCat: React.FC = () => {
  return (
    <Box
      sx={{
        pt: 25,
        pb: 8,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ mobile: 12, tablet: 6, laptop: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 1,
                  borderBottom: "3px solid #4A90E2",
                  display: "inline-block",
                  pb: 1,
                }}
              >
                Về HypeCat ℹ️
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: "bold",
                color: "white",
                mb: 4,
                lineHeight: 1.2,
                textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              HypeCat
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "1.2rem",
                lineHeight: 1.8,
                mb: 4,
                textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              HypeCat là cộng đồng hàng đầu dành cho những người đam mê Pokémon
              TCG tại Việt Nam. Chúng tôi là nơi kết nối các Trainer với nhau,
              chia sẻ niềm đam mê về những lá bài hiếm và tạo ra một không gian
              giao lưu thân thiện. Từ những người mới bắt đầu đến các chuyên
              gia, HypeCat chào đón tất cả mọi người cùng khám phá thế giới
              Pokémon đầy màu sắc!
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#e91e63",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0 8px 25px rgba(233, 30, 99, 0.4)",
                  "&:hover": {
                    bgcolor: "#c2185b",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 35px rgba(233, 30, 99, 0.6)",
                  },
                }}
              >
                ▶ Tham Gia Cộng Đồng
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  borderWidth: "2px",
                  "&:hover": {
                    borderWidth: "2px",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                  },
                }}
              >
                Khám Phá Thêm
              </Button>
            </Box>
          </Grid>

          <Grid size={{ mobile: 12, tablet: 6, laptop: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  border: "3px solid rgba(255,255,255,0.2)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#4A90E2",
                    p: 3,
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "4rem",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    HYPE
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    CAT
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 1,
                      mt: 3,
                    }}
                  >
                    {["😸", "🎴", "⚡", "🔥", "💎", "🌟"].map((icon, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          p: 1,
                          fontSize: "1.5rem",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        {icon}
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(0,0,0,0.8)",
                    p: 2,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  <Typography variant="body2">
                    Cộng đồng Pokémon TCG #1
                  </Typography>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "white",
                      mx: "auto",
                      mt: 1,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default IntroductionHypeCat;
