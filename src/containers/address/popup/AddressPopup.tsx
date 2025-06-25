import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    FormControlLabel,
    Checkbox,
    IconButton,
    Typography,
    Button,
    useMediaQuery,
    Slide
} from '@mui/material';
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface AddressFormData {
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
    label: string;
}

interface AddressDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    isEditing: boolean;
    formData: AddressFormData;
    setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
    errors: { name: string; phone: string; address: string };
}

const AddressDialog: React.FC<AddressDialogProps> = ({
    open,
    onClose,
    onSave,
    isEditing,
    formData,
    setFormData,
    errors
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
            TransitionComponent={Slide}
            PaperProps={{
                sx: { borderRadius: isMobile ? 0 : 2 }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">
                        {isEditing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Tên người nhận"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                        fullWidth
                        label="Địa chỉ chi tiết"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        error={!!errors.address}
                        helperText={errors.address}
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Nhập địa chỉ chi tiết..."
                        InputProps={{
                            startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.isDefault}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    isDefault: e.target.checked,
                                    label: e.target.checked ? 'Mặc định' : 'Địa chỉ lấy hàng'
                                }))}
                                sx={{ color: '#ff6b35', '&.Mui-checked': { color: '#ff6b35' } }}
                            />
                        }
                        label="Đặt làm địa chỉ mặc định"
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, px: 3 }}>
                    Hủy
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    sx={{
                        backgroundColor: '#ff6b35',
                        '&:hover': { backgroundColor: '#e55a2b' },
                        borderRadius: 2,
                        px: 3
                    }}
                >
                    {isEditing ? 'Cập nhật' : 'Thêm địa chỉ'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddressDialog;
