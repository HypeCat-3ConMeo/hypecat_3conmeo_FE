/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Paper,
  Container,
  CircularProgress,
  Fade,
  Slide,
  Badge,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Home as HomeIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  AdminPanelSettings as AdminIcon,
  SupervisedUserCircle as CustomerIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import userApi from "../../api/services/user_api/userAPI";
import type { UserData } from "../../types/Usertype";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      if (!id) return;
      const response: any = await userApi.getAccountById(id);
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const getStatusColor = (
    status: string
  ): "success" | "warning" | "error" | "default" => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "banned":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircleIcon sx={{ fontSize: 16 }} />;
      case "inactive":
        return <WarningIcon sx={{ fontSize: 16 }} />;
      case "banned":
        return <ErrorIcon sx={{ fontSize: 16 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <AdminIcon sx={{ fontSize: 16 }} />;
      case "customer":
        return <CustomerIcon sx={{ fontSize: 16 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 16 }} />;
    }
  };

  const InfoCard = ({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) => (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "50%",
              p: 1,
              color: "white",
            }}
          >
            {icon}
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2d3748" }}>
            {title}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>{children}</CardContent>
    </Card>
  );

  const StyledListItem = ({
    icon,
    primary,
    secondary,
  }: {
    icon: React.ReactNode;
    primary: string;
    secondary: any;
  }) => (
    <ListItem
      sx={{
        borderRadius: 2,
        mb: 1,
        bgcolor: "rgba(255,255,255,0.5)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.8)",
          transform: "translateX(4px)",
        },
      }}
    >
      <ListItemIcon>
        <Box
          sx={{
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            p: 0.5,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
          }}
        >
          {icon}
        </Box>
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "#4a5568" }}
          >
            {primary}
          </Typography>
        }
        secondary={
          <Typography variant="body2" sx={{ color: "#718096", mt: 0.5 }}>
            {secondary}
          </Typography>
        }
      />
    </ListItem>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={!loading} timeout={800}>
        <Box>
          {/* Header Card */}
          <Paper
            elevation={0}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: 4,
              mb: 4,
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.1,
              },
            }}
          >
            <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor:
                          getStatusColor(user?.status || "default") ===
                          "success"
                            ? "#10b981"
                            : getStatusColor(user?.status || "default") ===
                              "warning"
                            ? "#f59e0b"
                            : "#ef4444",
                        border: "3px solid white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getStatusIcon(user?.status || "default")}
                    </Box>
                  }
                >
                  <Avatar
                    src={user?.images?.[0]?.urlPath}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                      {user?.name?.charAt(0)}
                    </Typography>
                  </Avatar>
                </Badge>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                    User ID: #{user?.id}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      icon={getStatusIcon(user ? user?.status : "default")}
                      label={user?.status}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        "& .MuiChip-icon": { color: "white" },
                      }}
                    />
                    <Chip
                      icon={getRoleIcon(user ? user.role?.roleName : "default")}
                      label={user?.role?.roleName}
                      variant="outlined"
                      sx={{
                        borderColor: "rgba(255,255,255,0.5)",
                        color: "white",
                        "& .MuiChip-icon": { color: "white" },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Paper>

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: 200 }}
            >
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <Slide direction="up" in={!loading} timeout={600}>
              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid size={{ mobile: 12, tablet: 6, laptop: 6 }}>
                  <InfoCard icon={<PersonIcon />} title="Personal Information">
                    <List sx={{ p: 0 }}>
                      <StyledListItem
                        icon={<PersonIcon sx={{ fontSize: 20 }} />}
                        primary="Full Name"
                        secondary={user?.name}
                      />
                      <StyledListItem
                        icon={<EmailIcon sx={{ fontSize: 20 }} />}
                        primary="Email"
                        secondary={user?.email}
                      />
                      <StyledListItem
                        icon={<PhoneIcon sx={{ fontSize: 20 }} />}
                        primary="Phone"
                        secondary={user?.phone}
                      />
                    </List>
                  </InfoCard>
                </Grid>

                {/* Account Information */}
                <Grid size={{ mobile: 12, tablet: 6, laptop: 6 }}>
                  <InfoCard icon={<SecurityIcon />} title="Account Information">
                    <List sx={{ p: 0 }}>
                      <StyledListItem
                        icon={<SecurityIcon sx={{ fontSize: 20 }} />}
                        primary="User ID"
                        secondary={`#${user?.id}`}
                      />
                      <StyledListItem
                        icon={getRoleIcon(user?.role?.roleName || "default")}
                        primary="Role"
                        secondary={`${user?.role?.roleName} (ID: ${user?.role?.id})`}
                      />
                      <StyledListItem
                        icon={getStatusIcon(user?.status || "default")}
                        primary="Account Status"
                        secondary={
                          <Chip
                            size="small"
                            icon={getStatusIcon(user?.status || "default")}
                            label={user?.status}
                            color={getStatusColor(user?.status || "default")}
                          />
                        }
                      />
                    </List>
                  </InfoCard>
                </Grid>

                {/* Addresses Section */}
                <Grid size={{ mobile: 12, tablet: 12, laptop: 12 }}>
                  <InfoCard icon={<HomeIcon />} title="Addresses">
                    {Array.isArray(user?.addresses) &&
                    user.addresses.length > 0 ? (
                      <List sx={{ p: 0 }}>
                        {user.addresses.map((address, index) => (
                          <StyledListItem
                            key={address.id}
                            icon={<LocationIcon sx={{ fontSize: 20 }} />}
                            primary={`Address ${index + 1}`}
                            secondary={`${address.street}, ${address.ward}, ${address.province}`}
                          />
                        ))}
                      </List>
                    ) : (
                      <Alert
                        severity="info"
                        sx={{
                          bgcolor: "rgba(59, 130, 246, 0.1)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          borderRadius: 2,
                          "& .MuiAlert-icon": {
                            color: "#3b82f6",
                          },
                        }}
                      >
                        <Typography variant="body2">
                          No addresses added yet. Click here to add an address.
                        </Typography>
                      </Alert>
                    )}
                  </InfoCard>
                </Grid>
              </Grid>
            </Slide>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default UserDetail;
