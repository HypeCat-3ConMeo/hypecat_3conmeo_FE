import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Paper,
    Fade,
} from '@mui/material';
import {
    Add as AddIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Home as HomeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AddressDialog from './popup/AddressPopup';

interface Address {
    id: string;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
    label: string;
}

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'all 0.3s ease',
    height: '100%',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[4]
    }
}));

const DefaultChip = styled(Chip)(({ theme }) => ({
    fontWeight: 600,
    '&.default': {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText
    },
    '&.regular': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[700]
    }
}));

const AddressManager: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            name: 'Hoàng Gia Thành',
            phone: '(+84) 797 302 368',
            address: '43 Đường Trần Văn Ơn, Khu Phố Tây A\nPhường Đông Hòa, Thành Phố Dĩ An, Bình Dương',
            isDefault: true,
            label: 'Mặc định'
        },
        {
            id: '2',
            name: 'Em bé',
            phone: '(+84) 327 810 127',
            address: 'Clb Đua Thuyền Hải Phòng\nThị Trấn Minh Đức, Huyện Thủy Nguyên, Hải Phòng',
            isDefault: false,
            label: 'Địa chỉ lấy hàng'
        },
        {
            id: '3',
            name: 'Hoàng Gia Thành',
            phone: '(+84) 797 302 368',
            address: 'FPT Software Ho Chi Minh - F-Town 3\nPhường Long Thạnh Mỹ, Thành Phố Thủ Đức, TP. Hồ Chí Minh',
            isDefault: false,
            label: 'Địa chỉ lấy hàng'
        }
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const handleAdd = () => {
        setEditingAddress(null);
        setOpenDialog(true);
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setOpenDialog(true);
    };

    const handleSave = (addressData: Address) => {
        if (editingAddress) {
            // Update existing address
            setAddresses(prev => prev.map(addr =>
                addr.id === editingAddress.id
                    ? { ...addressData, id: editingAddress.id }
                    : addressData.isDefault ? { ...addr, isDefault: false } : addr
            ));
        } else {
            // Add new address
            setAddresses(prev => {
                if (addressData.isDefault) {
                    return [...prev.map(addr => ({ ...addr, isDefault: false })), addressData];
                }
                return [...prev, addressData];
            });
        }
    };

    const handleDelete = (id: string) => {
        setAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const handleSetDefault = (id: string) => {
        setAddresses(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
            label: addr.id === id ? 'Mặc định' : 'Địa chỉ lấy hàng'
        })));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                        Địa chỉ của tôi
                    </Typography>
                </Stack>
            </Paper>

            {/* Address List */}
            <Box mb={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="semibold" color="text.primary">
                        Địa chỉ
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                        sx={{
                            backgroundColor: '#ff6b35',
                            '&:hover': { backgroundColor: '#e55a2b' },
                            borderRadius: 2,
                            px: 3
                        }}
                    >
                        Thêm địa chỉ mới
                    </Button>
                </Box>

                {/* Grid Layout for Addresses */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)'
                        },
                        gap: 2
                    }}
                >
                    {addresses.map((address) => (
                        <Box key={address.id}>
                            <Fade in timeout={300}>
                                <StyledCard elevation={1} sx={{ borderRadius: 2 }}>
                                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box flex={1}>
                                            {/* Name and Status */}
                                            <Stack direction="row" alignItems="center" spacing={2} mb={2} flexWrap="wrap" useFlexGap>
                                                <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                    {address.name}
                                                </Typography>
                                                <DefaultChip
                                                    label={address.label}
                                                    size="small"
                                                    className={address.isDefault ? 'default' : 'regular'}
                                                />
                                            </Stack>

                                            {/* Contact Info */}
                                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                                <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.phone}
                                                </Typography>
                                            </Stack>

                                            {/* Address */}
                                            <Stack direction="row" alignItems="flex-start" spacing={1} mb={2}>
                                                <LocationIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.2 }} />
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}
                                                >
                                                    {address.address}
                                                </Typography>
                                            </Stack>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Stack spacing={1} alignItems="stretch">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Button
                                                    size="small"
                                                    onClick={() => handleEdit(address)}
                                                    sx={{ color: 'primary.main', fontWeight: 'medium' }}
                                                >
                                                    Cập nhật
                                                </Button>
                                                <Typography variant="body1" color="text.disabled">|</Typography>
                                                <Button
                                                    size="small"
                                                    onClick={() => handleDelete(address.id)}
                                                    sx={{ color: 'error.main', fontWeight: 'medium' }}
                                                >
                                                    Xóa
                                                </Button>
                                            </Stack>

                                            {!address.isDefault && (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => handleSetDefault(address.id)}
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        textTransform: 'none',
                                                        borderColor: 'grey.300',
                                                        color: 'text.secondary',
                                                        '&:hover': {
                                                            borderColor: 'grey.400',
                                                            backgroundColor: 'grey.50'
                                                        },
                                                    }}
                                                >
                                                    Thiết lập mặc định
                                                </Button>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </StyledCard>
                            </Fade>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Empty State */}
            {addresses.length === 0 && (
                <Paper elevation={1} sx={{ p: 8, textAlign: 'center', borderRadius: 2 }}>
                    <HomeIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Chưa có địa chỉ nào
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                        Thêm địa chỉ đầu tiên của bạn để bắt đầu
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        sx={{
                            backgroundColor: '#ff6b35',
                            '&:hover': { backgroundColor: '#e55a2b' }
                        }}
                    >
                        Thêm địa chỉ mới
                    </Button>
                </Paper>
            )}

            {/* Add/Edit Dialog */}
            <AddressDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSave}
                editingAddress={editingAddress}
            />
        </Container>
    );
};

export default AddressManager;