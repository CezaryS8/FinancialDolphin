import * as React from "react";
import { useState } from "react"
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDepositApi } from "../api/DepositApiService"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../security/AuthContext'

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function DepositMenuButton(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    const [id, setId] = useState(props.id);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleUpdateClick(id) {
        navigate(`/deposit/${id}`)
    }

    function handleDeleteClick(id) {
        deleteDepositApi(username, id)
            .then(
                () => {
                    props.onDelete(props.id) // calling the callback function
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch"
                    }
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        selected={option === "Pyxis"}
                        onClick={() => {
                            handleClose();
                            if (option === "Delete") {
                                handleDeleteClick(id);
                            } else if (option === "Edit") {
                                handleUpdateClick(id);
                            }
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
