/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Stack, FormControlLabel, Checkbox,
    IconButton, Typography, Button, useMediaQuery, Slide
} from '@mui/material';
import {
    Close as CloseIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import type { Address, AddressFormInput } from '../../../types/AddressType';

// interface Address {
//     id?: string;
//     name: string;
//     phone: string;
//     province: string;
//     ward: string;
//     street: string;
//     isDefault: boolean;
//     label?: string;
// }

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (address: AddressFormInput) => void;
    editingAddress?: AddressFormInput | null;
}

const AddressDialog: React.FC<Props> = ({ open, onClose, onSave, editingAddress }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isEditing = !!editingAddress;

    const [formData, setFormData] = useState<Address>({
        name: '', phone: '', province: '', ward: '', street: '', isDefault: false
    });

    useEffect(() => {
        if (open) {
            setFormData(editingAddress || {
                name: '', phone: '', province: '', ward: '', street: '', isDefault: false
            });
        }
    }, [open, editingAddress]);

    const handleChange = (key: keyof Address, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.phone || !formData.province || !formData.ward || !formData.street) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const fullData = {
            ...formData,
            label: formData.isDefault ? 'Mặc định' : 'Địa chỉ lấy hàng'
        };
        onSave(fullData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile} TransitionComponent={Slide}>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{isEditing ? 'Chỉnh sửa' : 'Thêm'} địa chỉ</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Tên người nhận" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                    <TextField label="Số điện thoại" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                    <TextField label="Tỉnh/Thành phố" value={formData.province} onChange={(e) => handleChange('province', e.target.value)} />
                    <TextField label="Quận/Huyện" value={formData.ward} onChange={(e) => handleChange('ward', e.target.value)} />
                    <TextField label="Đường/Số nhà" value={formData.street} onChange={(e) => handleChange('street', e.target.value)} />
                    {(!editingAddress || !editingAddress.isDefault) && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isDefault}
                                    onChange={(e) => handleChange('isDefault', e.target.checked)}
                                />
                            }
                            label="Đặt làm địa chỉ mặc định"
                        />
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSubmit} variant="contained">Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddressDialog;
