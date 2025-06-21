/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
// import authApi from "@/axios-clients/auth_api/authAPI";
import images from "../../constants/images";
// import useAuth from "@/hook/useAuth";
import { font_size } from "../../styles/config-file";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Fade,
  alpha,
  // useTheme,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import authApi from "../../api/services/AuthApi/AuthApi";

const Login = () => {
  // const theme = useTheme();
  //   const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!loginForm.email) {
      newErrors.email = "Vui lòng nhập tài khoản";
      isValid = false;
    }

    if (!loginForm.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (loginForm.password.length < 3) {
      newErrors.password = "Mật khẩu phải có ít nhất 3 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const res: any = await authApi.login(loginForm);
      localStorage.setItem("userInfor", JSON.stringify(res));
      const decoded: any = jwtDecode(res?.accessToken);
      console.log("first", decoded);
      // setAuth({
      //     user: decoded,
      //     accessToken: res?.accessToken,
      //   });
    } catch (error) {
      console.log("Login error", error);
      setErrors({
        email: "Tài khoản hoặc mật khẩu không chính xác",
        password: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLoginForm({ ...loginForm, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // Custom Logo Component
  const HypecatLogo = () => (
    <Box
      sx={{
        width: 90,
        height: 90,
        mx: "auto",
        mb: 3,
        borderRadius: "20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 15px 50px rgba(102, 126, 234, 0.5)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 8,
          right: 8,
          fontSize: "10px",
          fontWeight: "bold",
          color: "rgba(255,255,255,0.9)",
          zIndex: 2,
          letterSpacing: "1px",
        },
      }}
    >
      <img
        src={images.logo}
        alt="logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
        backgroundImage: `url(${images.background})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "scroll",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 25px 70px rgba(102, 126, 234, 0.15)",
            }}
          >
            {/* Header Section with improved design */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 5,
                textAlign: "center",
                color: "white",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                  zIndex: 1,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <HypecatLogo />

                <Typography
                  variant="h4"
                  fontWeight="700"
                  gutterBottom
                  sx={{
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    letterSpacing: "-0.8px",
                    mb: 1,
                  }}
                >
                  Chào mừng trở lại
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.9,
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                    fontWeight: 400,
                    fontSize: "1.1rem",
                  }}
                >
                  Đăng nhập vào Hypecat
                </Typography>
              </Box>
            </Box>

            {/* Form Section with improved styling */}
            <Box sx={{ p: 5 }}>
              <Stack spacing={3.5}>
                <TextField
                  fullWidth
                  label="Email hoặc tên đăng nhập"
                  id="email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={loginForm.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onKeyPress={handleKeyPress}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon
                            sx={{
                              color: errors.email ? "error.main" : "#667eea",
                              fontSize: "1.3rem",
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      backgroundColor: "rgba(102, 126, 234, 0.03)",
                      border: "2px solid transparent",
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.05)",
                        borderColor: "rgba(102, 126, 234, 0.2)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.1)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(102, 126, 234, 0.06)",
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                        transform: "translateY(-1px)",
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#667eea",
                      fontWeight: 500,
                    },
                    "& .MuiInputLabel-root": {
                      fontWeight: 500,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Mật khẩu"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={loginForm.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsIcon
                            sx={{
                              color: errors.password ? "error.main" : "#667eea",
                              fontSize: "1.3rem",
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{
                              color: "#667eea",
                              "&:hover": {
                                backgroundColor: alpha("#667eea", 0.1),
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      backgroundColor: "rgba(102, 126, 234, 0.03)",
                      border: "2px solid transparent",
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.05)",
                        borderColor: "rgba(102, 126, 234, 0.2)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.1)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(102, 126, 234, 0.06)",
                        borderColor: "#667eea",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                        transform: "translateY(-1px)",
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#667eea",
                      fontWeight: 500,
                    },
                    "& .MuiInputLabel-root": {
                      fontWeight: 500,
                    },
                  }}
                />

                <Box sx={{ textAlign: "right" }}>
                  {/* <Typography
                    component="a"
                    href="#"
                    sx={{
                      color: "#667eea",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#764ba2",
                        transform: "translateX(-2px)",
                      },
                    }}
                  >
                    Quên mật khẩu?
                  </Typography> */}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  onClick={handleLogin}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <LoginIcon />
                    )
                  }
                  sx={{
                    py: 2.2,
                    borderRadius: 3,
                    fontSize: font_size.buttonFontSize || "1.1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)",
                      transform: "translateY(-3px)",
                    },
                    "&:active": {
                      transform: "translateY(-1px)",
                    },
                    "&:disabled": {
                      background: alpha("#667eea", 0.6),
                      boxShadow: "0 5px 15px rgba(102, 126, 234, 0.2)",
                      transform: "none",
                    },
                  }}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </Stack>
            </Box>

            {/* Footer with improved styling */}
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                background: "rgba(102, 126, 234, 0.04)",
                borderTop: "1px solid rgba(102, 126, 234, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  opacity: 0.7,
                  letterSpacing: "0.3px",
                }}
              >
                © 2025 Hypecat. All rights reserved.
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
