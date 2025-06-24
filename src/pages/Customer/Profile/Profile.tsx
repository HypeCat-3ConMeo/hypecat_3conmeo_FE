import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
    IconButton,
    Card,
    CardContent,
    Divider,
    Alert,
    Fade,
    Chip
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

// Styled Components
const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    color: 'white',
    padding: theme.spacing(4),
    position: 'relative',
    borderRadius: '16px 16px 0 0'
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    '&:hover .photo-overlay': {
        opacity: 1
    }
}));

const PhotoOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    cursor: 'pointer'
}));

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@email.com',
        phone: '+84 912 345 678',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    });

    const [editMode, setEditMode] = useState(false);
    const [tempProfile, setTempProfile] = useState<UserProfile>(profile);
    const [errors, setErrors] = useState<Partial<UserProfile>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<UserProfile> = {};

        if (!tempProfile.name.trim()) {
            newErrors.name = 'Tên không được để trống';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!tempProfile.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!emailRegex.test(tempProfile.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
        if (!tempProfile.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!phoneRegex.test(tempProfile.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEdit = () => {
        setEditMode(true);
        setTempProfile(profile);
        setErrors({});
    };

    const handleSave = () => {
        if (validateForm()) {
            setProfile(tempProfile);
            setEditMode(false);
            setErrors({});
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setTempProfile(profile);
        setErrors({});
    };

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        setTempProfile(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleAvatarClick = () => {
        if (!editMode) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    handleInputChange('avatar', result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                py: 4,
                px: 2
            }}
        >
            <Container maxWidth="md">
                {/* Header */}
                <Box textAlign="center" mb={4}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                        Hồ Sơ Cá Nhân
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Quản lý thông tin cá nhân của bạn
                    </Typography>
                </Box>

                {/* Profile Card */}
                <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                    {/* Header với avatar */}
                    <GradientBox>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <AvatarContainer>
                                <Avatar
                                    src={editMode ? tempProfile.avatar : profile.avatar}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        border: '4px solid white',
                                        cursor: editMode ? 'pointer' : 'default'
                                    }}
                                    onClick={handleAvatarClick}
                                />
                                {editMode && (
                                    <PhotoOverlay className="photo-overlay">
                                        <PhotoCameraIcon sx={{ color: 'white', fontSize: 24 }} />
                                    </PhotoOverlay>
                                )}
                            </AvatarContainer>

                            <Typography variant="h4" component="h2" sx={{ mt: 2, fontWeight: 'bold' }}>
                                {editMode ? tempProfile.name : profile.name}
                            </Typography>
                        </Box>

                        {/* Edit Button */}
                        <Box position="absolute" top={16} right={16}>
                            {!editMode ? (
                                <IconButton
                                    onClick={handleEdit}
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                        }
                                    }}
                                >
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                            ) : (
                                <Box display="flex" gap={1}>
                                    <IconButton
                                        onClick={handleSave}
                                        sx={{
                                            backgroundColor: '#4caf50',
                                            '&:hover': { backgroundColor: '#45a049' }
                                        }}
                                    >
                                        <SaveIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleCancel}
                                        sx={{
                                            backgroundColor: '#f44336',
                                            '&:hover': { backgroundColor: '#da190b' }
                                        }}
                                    >
                                        <CancelIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </GradientBox>

                    {/* Form Content */}
                    <CardContent sx={{ p: 3 }}>
                        <Box display="flex" flexDirection="column" gap={3}>
                            {/* Name Field */}
                            <Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <PersonIcon sx={{ color: '#1976d2', mr: 1 }} />
                                    <Typography variant="subtitle2" fontWeight="medium">
                                        Họ và tên
                                    </Typography>
                                </Box>
                                {editMode ? (
                                    <TextField
                                        fullWidth
                                        value={tempProfile.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        placeholder="Nhập họ và tên"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                ) : (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 2,
                                            border: '1px solid #e0e0e0'
                                        }}
                                    >
                                        <Typography>{profile.name}</Typography>
                                    </Paper>
                                )}
                            </Box>

                            {/* Email Field */}
                            <Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <EmailIcon sx={{ color: '#4caf50', mr: 1 }} />
                                    <Typography variant="subtitle2" fontWeight="medium">
                                        Email
                                    </Typography>
                                </Box>
                                {editMode ? (
                                    <TextField
                                        fullWidth
                                        type="email"
                                        value={tempProfile.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        placeholder="Nhập địa chỉ email"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                ) : (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 2,
                                            border: '1px solid #e0e0e0'
                                        }}
                                    >
                                        <Typography>{profile.email}</Typography>
                                    </Paper>
                                )}
                            </Box>

                            {/* Phone Field */}
                            <Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <PhoneIcon sx={{ color: '#ff9800', mr: 1 }} />
                                    <Typography variant="subtitle2" fontWeight="medium">
                                        Số điện thoại
                                    </Typography>
                                </Box>
                                {editMode ? (
                                    <TextField
                                        fullWidth
                                        type="tel"
                                        value={tempProfile.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        placeholder="Nhập số điện thoại"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                ) : (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 2,
                                            border: '1px solid #e0e0e0'
                                        }}
                                    >
                                        <Typography>{profile.phone}</Typography>
                                    </Paper>
                                )}
                            </Box>
                        </Box>
                    </CardContent>

                    {/* Footer */}
                    {editMode && (
                        <>
                            <Divider />
                            <Box p={2} display="flex" justifyContent="flex-end" gap={2} bgcolor="#f8f9fa">
                                <Button
                                    variant="outlined"
                                    onClick={handleCancel}
                                    startIcon={<CancelIcon />}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    startIcon={<SaveIcon />}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Lưu thay đổi
                                </Button>
                            </Box>
                        </>
                    )}
                </Card>

                {/* Additional Info */}
                <Box mt={3} textAlign="center">
                    <Chip
                        label={`Cập nhật lần cuối: ${new Date().toLocaleDateString('vi-VN')}`}
                        variant="outlined"
                        sx={{ backgroundColor: 'white' }}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ProfilePage;