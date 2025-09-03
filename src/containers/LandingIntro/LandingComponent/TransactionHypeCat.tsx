import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Button,
  Chip,
} from "@mui/material";
import { Verified, LocalOffer, Security } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import config from "../../../configs";

const TransactionHypeCat: React.FC = () => {
  const navigation = useNavigate();
  const tradingFeatures = [
    {
      title: "Xác thực thẻ bài",
      description: "Hệ thống xác thực chuyên nghiệp đảm bảo tính chính hãng",
      icon: <Verified sx={{ fontSize: "3rem" }} />,
      color: "#4CAF50",
    },
    {
      title: "Giá cả minh bạch",
      description: "Bảng giá cập nhật liên tục theo thị trường quốc tế",
      icon: <LocalOffer sx={{ fontSize: "3rem" }} />,
      color: "#FF9800",
    },
    {
      title: "Giao dịch an toàn",
      description: "Hệ thống bảo mật đa lớp, thanh toán qua ví điện tử",
      icon: <Security sx={{ fontSize: "3rem" }} />,
      color: "#2196F3",
    },
  ];

  const hotCards = [
    {
      name: "Charizard VMAX",
      price: "2.500.000 VNĐ",
      condition: "Mint",
      image:
        "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
      isHot: true,
    },
    {
      name: "Pikachu Illustrator",
      price: "50.000.000 VNĐ",
      condition: "Near Mint",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      isHot: true,
    },
    {
      name: "Base Set Blastoise",
      price: "800.000 VNĐ",
      condition: "Light Play",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
      isHot: false,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        sx={{
          color: "white",
          mb: 1,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        🏪 Chợ Thẻ Bài Uy Tín
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.8)",
          mb: 6,
          textAlign: "center",
          fontSize: "1.1rem",
        }}
      >
        Nơi trao đổi, mua bán thẻ bài Pokémon TCG chính hãng và uy tín nhất
      </Typography>

      {/* Trading Features */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {tradingFeatures.map((feature, index) => (
          <Grid size={{ mobile: 12, tablet: 4, laptop: 4 }} key={index}>
            <Card
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                p: 4,
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: feature.color,
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: `0 12px 24px ${feature.color}30`,
                },
              }}
            >
              <Box sx={{ color: feature.color, mb: 2 }}>{feature.icon}</Box>
              <Typography
                variant="h5"
                sx={{ color: "white", mb: 2, fontWeight: "bold" }}
              >
                {feature.title}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}
              >
                {feature.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Hot Cards */}
      <Typography
        variant="h4"
        sx={{
          color: "white",
          mb: 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        🔥 Thẻ Hot Nhất Tuần
      </Typography>

      <Grid container spacing={3}>
        {hotCards.map((card, index) => (
          <Grid size={{ mobile: 12, tablet: 6, laptop: 4 }} key={index}>
            <Card
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(233, 30, 99, 0.3)",
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <img
                  src={card.image}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                {card.isHot && (
                  <Chip
                    label="HOT"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "#e91e63",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.8)",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                  }}
                >
                  {card.condition}
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold", mb: 1 }}
                >
                  {card.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#4CAF50", fontWeight: "bold" }}
                  >
                    {card.price}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: "#e91e63",
                      "&:hover": { bgcolor: "#c2185b" },
                    }}
                  >
                    Mua ngay
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#4CAF50",
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "25px",
            "&:hover": {
              bgcolor: "#45a049",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => navigation(config.customerRoutes.productList)}
        >
          🛒 Xem Tất Cả Sản Phẩm
        </Button>
      </Box>
    </Container>
  );
};

export default TransactionHypeCat;
