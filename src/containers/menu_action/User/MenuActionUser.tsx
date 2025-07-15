/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../../../configs";
import type { UserData } from "../../../types/Usertype";
import DeleteUser from "../../user/popup/DeleteUser";

export default function MenuActionUser({
  userData,
  introId,
  fetchData,
  onOpenDelete,
}: {
  userData: UserData;
  isDeleted?: boolean;
  introId?: string;
  onOpenDetail?: any;
  fetchData?: () => void;
  onOpenDelete: () => void;
}) {
  console.log(userData);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleDelete = () => {
    if (onOpenDelete) {
      onOpenDelete();
    }
    setOpenDelete(true);
    setAnchorEl(null);
  };

  const actions = [
    {
      label: "Chi Tiết",
      icon: <InfoIcon sx={{ mr: 1 }} color="info" />,
      action: () => {
        navigate(
          config.adminRoutes.detailUser.replace(":id", userData?.id.toString())
        );
      },
    },
    {
      label: "Xoá người dùng",
      icon: <MoreHorizIcon sx={{ mr: 1 }} color="primary" />,
      action: () => {
        handleDelete();
      },
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    setTimeout(() => {
      setAnchorEl(target);
    }, 0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateSuccess = () => {
    if (fetchData) {
      fetchData();
    }
    setOpenDelete(false);
  };
  return (
    <div>
      <Button
        id={introId}
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "20px" }}
      >
        <MoreHorizIcon
          sx={{
            color: "#6464CD",
          }}
        />
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.action();
              handleClose();
            }}
          >
            {action.icon}
            <span>{action.label}</span>
          </MenuItem>
        ))}
      </Menu>

      {openDelete && (
        <DeleteUser
          onOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          data={userData}
          fetchData={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
