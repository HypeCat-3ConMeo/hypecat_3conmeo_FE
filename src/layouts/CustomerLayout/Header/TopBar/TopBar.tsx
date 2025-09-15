/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  MenuItem,
  Typography,
  Container,
  Paper,
  MenuList,
  Popper,
  Grow,
  ClickAwayListener,
  useScrollTrigger,
  Slide,
  Chip,
  Divider,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowDown,
  // ArrowRight,
  Home,
  Article,
  Policy,
  Gavel,
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Logo from "../../../../components/Logo/Logo";
import RightMenu from "../RightMenu/RightMenu";
import config from "../../../../configs";
import categoryApi from "../../../../api/services/CategoryApi/categoryAPI";

interface GetCategoryProps {
  id: string;
  name: string;
  isDeleted: "false";
  masterCategoryId: string | null;
}

// Enhanced Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "fixed",
  top: 0,
  zIndex: 1100,
  [theme.breakpoints.down("sm")]: {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(15px)",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "80px",
  padding: theme.spacing(0, 3),
  justifyContent: "space-between",
  [theme.breakpoints.down("lg")]: {
    minHeight: "70px",
    padding: theme.spacing(0, 2.5),
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "64px",
    padding: theme.spacing(0, 2),
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "56px",
    padding: theme.spacing(0, 1.5),
  },
}));

const NavBar = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    minHeight: "56px",
  },
  [theme.breakpoints.down("md")]: {
    display: "none", // Hide on mobile - we'll use drawer instead
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
  },
}));

const MegaMenuPaper = styled(Paper)(({ theme }) => ({
  minWidth: "900px",
  maxWidth: "1200px",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  background: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(20px)",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("xl")]: {
    minWidth: "800px",
    padding: theme.spacing(3.5),
  },
  [theme.breakpoints.down("lg")]: {
    minWidth: "700px",
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "95vw",
    maxWidth: "95vw",
    maxHeight: "85vh",
    overflowY: "auto",
    padding: theme.spacing(2.5),
    margin: theme.spacing(0.5),
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "100vw",
    maxWidth: "100vw",
    borderRadius: 0,
    padding: theme.spacing(2),
    margin: 0,
  },
}));

const CategoryGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: theme.spacing(3),
  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: theme.spacing(2.5),
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
    gap: 0,
  },
}));

const CategoryCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.03
  )} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2.5),
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.08
    )} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
    transform: "translateY(-4px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
    "&::before": {
      transform: "scaleX(1)",
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    "&:hover": {
      transform: "none",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
}));

const SubcategoryItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 0),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: "translateX(8px)",
    paddingLeft: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 1.5),
    margin: theme.spacing(0.25, 0),
    "&:hover": {
      transform: "translateX(4px)",
      paddingLeft: theme.spacing(2),
    },
  },
}));

const LogoContainer = styled(Link)(({ theme }) => ({
  height: "60px",
  width: "180px",
  display: "block",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
  [theme.breakpoints.down("lg")]: {
    height: "50px",
    width: "160px",
  },
  [theme.breakpoints.down("md")]: {
    height: "40px",
    width: "140px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "32px",
    width: "120px",
  },
}));

// Enhanced Navigation Button with better responsive design
const navButtonStyles = (theme: any) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "14px",
  letterSpacing: "0.5px",
  padding: theme.spacing(1.5, 3),
  textTransform: "none",
  borderRadius: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "transparent",
  minWidth: "auto",
  whiteSpace: "nowrap",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transition: "left 0.3s ease",
    zIndex: -1,
  },
  "&:hover": {
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    "&::before": {
      left: 0,
    },
    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
      transform: "scale(1.1)",
    },
  },
  "& .MuiButton-startIcon, & .MuiButton-endIcon": {
    transition: "transform 0.3s ease",
  },
  [theme.breakpoints.down("xl")]: {
    padding: theme.spacing(1.3, 2.5),
    fontSize: "13px",
  },
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(1.2, 2),
    fontSize: "12px",
  },
});

// Enhanced Mobile Drawer
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 320,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.paper,
      0.98
    )} 0%, ${alpha(theme.palette.grey[50], 0.98)} 100%)`,
    backdropFilter: "blur(20px)",
    [theme.breakpoints.down("sm")]: {
      width: "85vw",
      maxWidth: 300,
    },
  },
}));

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const TopBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState<GetCategoryProps[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const pageSize: string = "1000";
  // Mock data for categories
  const fethCategory = async () => {
    const param = {
      CateType: "Product",
      pageSize: pageSize,
    };
    const response: any = await categoryApi.getCategoryList(param);
    setMenuData(response.items);
  };
  useEffect(() => {
    fethCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = (categoryId?: string) => {
    const query = categoryId ? `?CategoryId=${categoryId}` : "";
    console.log(categoryId);

    const targetPath = `/product-list${query}`;
    if (location.pathname === targetPath) {
      window.location.href = targetPath;
    } else {
      navigate(targetPath);
    }
    handleClose();
    setMobileDrawerOpen(false);
  };

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (isMobile) {
        setMobileCategoryOpen(true);
      } else {
        setAnchorEl(event.currentTarget);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (isMobile && anchorEl) {
      setAnchorEl(null);
    } else {
      setMobileDrawerOpen(false);
    }
  }, [isMobile, anchorEl]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleMobileCategory = () => {
    setMobileCategoryOpen(!mobileCategoryOpen);
  };

  const renderCategories = () => {
    //   const parentCategories = menuData.filter(
    //     (item) => item.status === "Active" && item.type === "Parent"
    //   );

    return (
      <CategoryGrid>
        {menuData?.map((parent) => {
          const children = menuData.filter(
            (item) =>
              item.masterCategoryId === parent.id && item.isDeleted === "false"
          );

          return (
            <CategoryCard
              key={parent.id}
              onClick={() => handleCategoryClick(parent.id)}
            >
              <Typography
                variant={isSmallMobile ? "subtitle1" : "h6"}
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(4px)",
                  },
                  [theme.breakpoints.down("sm")]: {
                    mb: 1.5,
                    fontSize: "1rem",
                  },
                }}
                onClick={() => handleCategoryClick(parent.id)}
              >
                {parent.name}
                {/* <ArrowRight
                  sx={{
                    ml: 1,
                    fontSize: isSmallMobile ? 18 : 20,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                /> */}
              </Typography>
              <MenuList dense>
                {children.map((child) => (
                  <SubcategoryItem
                    key={child.id}
                    onClick={() => handleCategoryClick(child.id)}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: isSmallMobile ? "0.8rem" : "0.875rem",
                      }}
                    >
                      {child.name}
                    </Typography>
                  </SubcategoryItem>
                ))}
              </MenuList>
            </CategoryCard>
          );
        })}
      </CategoryGrid>
    );
  };

  // Mobile navigation items
  const mobileNavItems = [
    { label: "Trang Chủ", icon: <Home />, to: config.customerRoutes.home },
    { label: "Tin Tức", icon: <Article />, to: config.customerRoutes.news },
    {
      label: "Điều Khoản",
      icon: <Gavel />,
      to: config.customerRoutes.termsOfService,
    },
    {
      label: "Chính Sách",
      icon: <Policy />,
      to: config.customerRoutes.privacyPolicy,
    },
  ];

  const renderMobileCategories = () => {
    // const parentCategories = menuData.filter(
    //   (item) => item.status === "Active" && item.type === "Parent"
    // );

    return menuData.map((parent) => {
      // const children = menuData.filter(
      //   (item) =>
      //     item.masterCategoryId === parent.id && item.isDeleted === "false"
      // );

      return (
        <Box
          key={parent.id}
          component="button"
          onClick={() => handleCategoryClick(parent.id)}
        >
          <ListItem
            onClick={() => handleCategoryClick(parent.id)}
            sx={{
              pl: 4,
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemText
              primary={parent.name}
              primaryTypographyProps={{
                fontWeight: 600,
                color: "primary.main",
                fontSize: isSmallMobile ? "0.9rem" : "1rem",
              }}
            />
          </ListItem>
          {/* {children.map((child) => (
            <ListItem
              key={child.id}
              onClick={() => handleCategoryClick(child.id)}
              sx={{
                pl: 6,
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemText
                primary={child.name}
                primaryTypographyProps={{
                  fontSize: isSmallMobile ? "0.8rem" : "0.875rem",
                }}
              />
            </ListItem>
          ))} */}
        </Box>
      );
    });
  };

  return (
    <>
      <HideOnScroll>
        <StyledAppBar>
          <StyledToolbar>
            {!isMobile && (
              <LogoContainer to="/">
                <Logo />
              </LogoContainer>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flex: 1,
                justifyContent: isMobile ? "space-between" : "flex-end", // keep this
                flexDirection: isMobile ? "row-reverse" : "row",
              }}
            >
              <RightMenu />
              {isMobile && (
                <IconButton
                  onClick={toggleMobileDrawer}
                  sx={{
                    color: theme.palette.text.primary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </StyledToolbar>

          {!isMobile && (
            <NavBar>
              <Container
                maxWidth="xl"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Button
                    component={Link}
                    to={config.customerRoutes.home}
                    startIcon={<Home />}
                    sx={navButtonStyles(theme)}
                  >
                    Trang Chủ
                  </Button>

                  <Button
                    onClick={handleMenuOpen}
                    sx={navButtonStyles(theme)}
                    endIcon={
                      <KeyboardArrowDown
                        sx={{
                          transition: "transform 0.3s ease",
                          transform: anchorEl
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    }
                  >
                    Loại Sản Phẩm
                  </Button>

                  <Button
                    component={Link}
                    to={config.customerRoutes.news}
                    startIcon={<Article />}
                    sx={navButtonStyles(theme)}
                  >
                    Tin Tức
                  </Button>

                  <Button
                    component={Link}
                    to={config.customerRoutes.termsOfService}
                    startIcon={<Gavel />}
                    sx={navButtonStyles(theme)}
                  >
                    Điều Khoản
                  </Button>

                  <Button
                    component={Link}
                    to={config.customerRoutes.privacyPolicy}
                    startIcon={<Policy />}
                    sx={navButtonStyles(theme)}
                  >
                    Chính Sách
                  </Button>
                </Stack>
              </Container>
            </NavBar>
          )}

          {/* Desktop Mega Menu */}
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: 1300 }}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} timeout={400}>
                <div>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MegaMenuPaper elevation={0}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant={isSmallMobile ? "h5" : "h4"}
                          sx={{
                            fontWeight: 800,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 1,
                            fontSize: {
                              xs: "1.25rem",
                              sm: "1.5rem",
                              md: "2rem",
                            },
                          }}
                        >
                          Danh Mục Sản Phẩm
                        </Typography>
                        <Box
                          sx={{
                            height: "3px",
                            width: "60px",
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            borderRadius: "2px",
                          }}
                        />
                      </Box>
                      {renderCategories()}

                      <Box sx={{ mt: 4, textAlign: "center" }}>
                        <Chip
                          label="Xem tất cả sản phẩm"
                          variant="outlined"
                          onClick={() => handleCategoryClick()}
                          sx={{
                            fontWeight: 600,
                            fontSize: isSmallMobile ? "12px" : "14px",
                            px: 3,
                            py: 1,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              color: "white",
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                        />
                      </Box>
                    </MegaMenuPaper>
                  </ClickAwayListener>
                </div>
              </Grow>
            )}
          </Popper>

          {/* Enhanced Mobile Drawer */}
          <StyledDrawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={toggleMobileDrawer}
          >
            <Box sx={{ p: 3, pt: 2, position: "relative" }}>
              {isMobile && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <LogoContainer to="/" style={{ marginBottom: 35 }}>
                      <Logo />
                    </LogoContainer>
                  </Box>
                  <IconButton
                    onClick={toggleMobileDrawer}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Divider sx={{ mb: 2, mt: 2 }} />
                </>
              )}
              {!isMobile && <Box sx={{ mb: 3 }} />}

              <List>
                {/* Navigation Items */}
                {mobileNavItems.map((item) => (
                  <ListItem
                    key={item.label}
                    component={Link}
                    to={item.to}
                    onClick={() => setMobileDrawerOpen(false)}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      mx: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}

                {/* Categories */}
                <ListItem
                  onClick={toggleMobileCategory}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    mx: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    <Article />
                  </ListItemIcon>
                  <ListItemText
                    primary="Loại Sản Phẩm"
                    sx={{ fontWeight: 500 }}
                  />
                  {mobileCategoryOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={mobileCategoryOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      onClick={() => handleCategoryClick()}
                      sx={{
                        pl: 4,
                        mb: 1,
                        borderRadius: 2,
                        mx: 1,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemText
                        primary="Tất cả sản phẩm"
                        sx={{ fontWeight: 500, color: "primary.main" }}
                      />
                    </ListItem>
                    {renderMobileCategories()}
                  </List>
                </Collapse>
              </List>
            </Box>
          </StyledDrawer>
        </StyledAppBar>
      </HideOnScroll>
    </>
  );
};

export default TopBar;
