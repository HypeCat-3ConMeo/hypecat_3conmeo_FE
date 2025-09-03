import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { PlayArrow, Star, LiveTv } from "@mui/icons-material";

const LiveStreamHypeCat: React.FC = () => {
  const streamers = [
    {
      id: 1,
      name: "PokeMaster Linh",
      avatar: "😸",
      specialty: "Booster Box Opening",
      rating: 4.9,
      viewers: "2.3K",
      status: "LIVE",
      tiktokLink: "@pokemaster_linh",
      thumbnail:
        "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=400&h=250&fit=crop",
      nextStream: "Hôm nay 20:00",
    },
    {
      id: 2,
      name: "Thầy Giáo Pokémon",
      avatar: "🎓",
      specialty: "Rare Card Hunt",
      rating: 4.8,
      viewers: "1.8K",
      status: "LIVE",
      tiktokLink: "@thaygiao_pokemon",
      thumbnail:
        "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=250&fit=crop",
      nextStream: "Mai 19:00",
    },
    {
      id: 3,
      name: "Pokémon Hân",
      avatar: "👸",
      specialty: "Japanese Cards",
      rating: 4.7,
      viewers: "1.5K",
      status: "OFFLINE",
      tiktokLink: "@pokemon_han",
      thumbnail:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      nextStream: "Chủ nhật 21:00",
    },
    {
      id: 4,
      name: "Card Collector Pro",
      avatar: "🏆",
      specialty: "Vintage Cards",
      rating: 4.9,
      viewers: "2.1K",
      status: "LIVE",
      tiktokLink: "@cardcollector_pro",
      thumbnail:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
      nextStream: "Tối nay 22:30",
    },
  ];

  const upcomingStreams = [
    {
      time: "20:00 Hôm nay",
      title: "Opening 10 Booster Box Pokémon 151",
      streamer: "PokeMaster Linh",
      viewers: "500+ đang chờ",
    },
    {
      time: "21:30 Hôm nay",
      title: "Hunt for Charizard Alternative Art",
      streamer: "Card Collector Pro",
      viewers: "300+ đang chờ",
    },
    {
      time: "19:00 Ngày mai",
      title: "Japanese Booster Box Battle",
      streamer: "Thầy Giáo Pokémon",
      viewers: "800+ đang chờ",
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
        📺 Live Stream Kéo Thẻ
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
        Theo dõi các streamer hàng đầu mở pack và hunt thẻ hiếm trực tiếp
      </Typography>

      {/* Live Streamers */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {streamers.map((streamer) => (
          <Grid size={{ mobile: 12, tablet: 6, laptop: 3 }} key={streamer.id}>
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
                  boxShadow: "0 12px 24px rgba(255, 107, 157, 0.3)",
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <img
                  src={streamer.thumbnail}
                  alt={streamer.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                {streamer.status === "LIVE" && (
                  <Chip
                    label="🔴 LIVE"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "#e91e63",
                      color: "white",
                      fontWeight: "bold",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.05)" },
                        "100%": { transform: "scale(1)" },
                      },
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
                  👥 {streamer.viewers}
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontSize: "1.5rem", mr: 1 }}>
                    {streamer.avatar}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      {streamer.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {streamer.specialty}
                    </Typography>
                  </Box>
                </Box>

                {/* TikTok Link */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontSize: "1rem", mr: 0.5 }}>📱</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#00f2ea", cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        `https://tiktok.com/${streamer.tiktokLink}`,
                        "_blank"
                      )
                    }
                  >
                    {streamer.tiktokLink}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Star sx={{ color: "#FFE66D", fontSize: "1rem", mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: "white", mr: 2 }}>
                    {streamer.rating}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    📅 {streamer.nextStream}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<PlayArrow />}
                    sx={{
                      bgcolor: "#e91e63",
                      flex: 1,
                      "&:hover": { bgcolor: "#c2185b" },
                    }}
                  >
                    {streamer.status === "LIVE" ? "Xem" : "Theo dõi"}
                  </Button>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: "rgba(0, 242, 234, 0.2)",
                      color: "#00f2ea",
                      "&:hover": { bgcolor: "rgba(0, 242, 234, 0.3)" },
                    }}
                    onClick={() =>
                      window.open(
                        `https://tiktok.com/${streamer.tiktokLink}`,
                        "_blank"
                      )
                    }
                  >
                    📱
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Streams Schedule */}
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.2)",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ⏰ Lịch Stream Sắp Tới
        </Typography>

        <Grid container spacing={3}>
          {upcomingStreams.map((stream, index) => (
            <Grid size={{ mobile: 12, tablet: 4, laptop: 4 }} key={index}>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  p: 3,
                  border: "1px solid rgba(255,255,255,0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#4A90E2", fontWeight: "bold", mb: 1 }}
                >
                  {stream.time}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontWeight: "bold", mb: 1 }}
                >
                  {stream.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
                >
                  🎙️ {stream.streamer}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  👥 {stream.viewers}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<LiveTv />}
          sx={{
            bgcolor: "#e91e63",
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "25px",
            "&:hover": {
              bgcolor: "#c2185b",
              transform: "translateY(-2px)",
            },
          }}
        >
          📺 Tham Gia Live Stream Ngay
        </Button>
      </Box>
    </Container>
  );
};

export default LiveStreamHypeCat;
