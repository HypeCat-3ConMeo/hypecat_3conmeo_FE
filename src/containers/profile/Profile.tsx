import React, { useEffect, useState } from 'react';
import {
    Box, Container, Paper, Avatar, Typography, TextField, Button,
    IconButton, Card, CardContent, Divider, Chip
} from '@mui/material';
import {
    Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon,
    Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon,
    PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import type { User } from '../../types/Usertype';
import { uploadImageToFirebase } from '../../firebase/uploadImageToFirebase';
import userApi from '../../api/services/user_api/userAPI';


// Styled components
const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    color: 'white',
    padding: theme.spacing(4),
    position: 'relative',
    borderRadius: '16px 16px 0 0'
}));

const AvatarContainer = styled(Box)(() => ({
    position: 'relative',
    display: 'inline-block',
    '&:hover .photo-overlay': {
        opacity: 1
    }
}));

const PhotoOverlay = styled(Box)(() => ({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: 0, transition: 'opacity 0.3s ease',
    cursor: 'pointer'
}));

// Component
const Profile: React.FC = () => {
    const [profile, setProfile] = useState<User>();
    const [formData, setFormData] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState<Partial<User>>({});

    const fetchProfile = async () => {
        try {
            const res = await userApi.getProfile();
            setProfile(res);
            setFormData({ ...res });
        } catch (err) {
            console.error('Lỗi khi lấy thông tin:', err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEdit = () => {
        if (!profile) return;
        setEditMode(true);
        setFormData({ ...profile });
        setErrors({});
    };

    const handleCancel = () => {
        if (!profile) return;
        setFormData({ ...profile });
        setEditMode(false);
        setErrors({});
    };

    const handleChange = (field: keyof User, value: string) => {
        if (!formData) return;
        setFormData(prev => ({ ...prev!, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<User> = {};

        if (!formData?.name?.trim()) newErrors.name = 'Tên không được để trống';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData?.email?.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
        if (!formData?.phone?.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!formData || !validate()) return;
        try {
            console.log(formData)
            //const updated = await userApi.updateProfile(formData);
            // setProfile(updated);
            // setFormData({ ...updated });
            // setEditMode(false);
        } catch (err) {
            console.error("Lỗi khi cập nhật thông tin:", err);
        }
    };

    const handleAvatarClick = async () => {
        if (!editMode) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async (e: Event) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            try {
                const downloadUrl: string = await uploadImageToFirebase(file);

                setFormData(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        images: [{ urlPath: downloadUrl }]
                    };
                });
            } catch (error) {
                console.error("Lỗi khi upload ảnh:", error);
            }
        };

        input.click();
    };


    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4, px: 2 }}>
            <Container maxWidth="md">
                <Box textAlign="center" mb={4}>
                    <Typography variant="h3" fontWeight="bold">Hồ Sơ Cá Nhân</Typography>
                    <Typography variant="h6" color="text.secondary">Quản lý thông tin cá nhân của bạn</Typography>
                </Box>

                <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                    <GradientBox>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <AvatarContainer>
                                <Avatar
                                    src={
                                        editMode
                                            ? typeof formData?.images?.[0]?.urlPath === 'string'
                                                ? formData.images[0].urlPath
                                                : undefined
                                            : typeof profile?.images?.[0]?.urlPath === 'string'
                                                ? profile.images[0].urlPath
                                                : undefined
                                    }
                                    sx={{ width: 100, height: 100 }}
                                    onClick={handleAvatarClick}
                                />
                                {editMode && (
                                    <PhotoOverlay className="photo-overlay">
                                        <IconButton onClick={handleAvatarClick}>
                                            <PhotoCameraIcon sx={{ color: 'white', fontSize: 24 }} />
                                        </IconButton>
                                    </PhotoOverlay>
                                )}
                            </AvatarContainer>
                            <Typography variant="h4" mt={2} fontWeight="bold">
                                {editMode ? formData?.name : profile?.name}
                            </Typography>
                        </Box>

                        {/* Nút hành động */}
                        <Box position="absolute" top={16} right={16}>
                            {!editMode ? (
                                <IconButton onClick={handleEdit} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                            ) : (
                                <Box display="flex" gap={1}>
                                    <IconButton onClick={handleSave} sx={{ backgroundColor: '#4caf50' }}>
                                        <SaveIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                    <IconButton onClick={handleCancel} sx={{ backgroundColor: '#f44336' }}>
                                        <CancelIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </GradientBox>

                    <CardContent sx={{ p: 3 }}>
                        <Box display="flex" flexDirection="column" gap={3}>
                            {/* Name */}
                            <Field
                                label="Họ và tên"
                                icon={<PersonIcon sx={{ color: '#1976d2', mr: 1 }} />}
                                value={editMode ? formData?.name : profile?.name}
                                onChange={e => handleChange('name', e.target.value)}
                                error={errors.name}
                                editable={editMode}
                            />

                            {/* Email */}
                            <Field
                                label="Email"
                                icon={<EmailIcon sx={{ color: '#4caf50', mr: 1 }} />}
                                value={editMode ? formData?.email : profile?.email}
                                onChange={e => handleChange('email', e.target.value)}
                                error={errors.email}
                                editable={editMode}
                            />

                            {/* Phone */}
                            <Field
                                label="Số điện thoại"
                                icon={<PhoneIcon sx={{ color: '#ff9800', mr: 1 }} />}
                                value={editMode ? formData?.phone : profile?.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                error={errors.phone}
                                editable={editMode}
                            />
                        </Box>
                    </CardContent>

                    {/* Footer */}
                    {editMode && (
                        <>
                            <Divider />
                            <Box p={2} display="flex" justifyContent="flex-end" gap={2} bgcolor="#f8f9fa">
                                <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel}>Hủy bỏ</Button>
                                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>Lưu thay đổi</Button>
                            </Box>
                        </>
                    )}
                </Card>

                {/* Last updated */}
                <Box mt={3} textAlign="center">
                    <Chip label={`Cập nhật lần cuối: ${new Date().toLocaleDateString('vi-VN')}`} variant="outlined" />
                </Box>
            </Container>
        </Box>
    );
};

// Field Component
const Field = ({
    label,
    icon,
    value,
    onChange,
    error,
    editable
}: {
    label: string,
    icon: React.ReactNode,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    editable: boolean
}) => (
    <Box>
        <Box display="flex" alignItems="center" mb={1}>
            {icon}
            <Typography variant="subtitle2" fontWeight="medium">{label}</Typography>
        </Box>
        {editable ? (
            <TextField
                fullWidth
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
        ) : (
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                <Typography>{value}</Typography>
            </Paper>
        )}
    </Box>
);

export default Profile;
