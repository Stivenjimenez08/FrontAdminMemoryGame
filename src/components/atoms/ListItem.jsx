import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

export const ListItemBtn = ({title,children, route}) => {
  return (
    <ListItem disablePadding sx={{mt:1}}>
        <ListItemButton component={RouterLink} to={route}>
            <ListItemIcon> {children} </ListItemIcon>
            <ListItemText>{title}</ListItemText>
        </ListItemButton>
    </ListItem>
  )
}

