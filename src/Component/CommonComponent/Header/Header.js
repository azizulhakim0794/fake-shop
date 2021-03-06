import React, { useState, useContext,useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Grid, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
const drawerWidth = 240;
const headerStyles = makeStyles((theme) => ({
  btnLogin: {
    textAlign: "end"
  },
  toolbar: {
    backgroundColor: '#1b2b38'
  },

  menuButtonHidden: {
    display: 'none',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const Header = () => {
  const classes = headerStyles();
  const theme = useTheme();
  const history = useHistory();
  const [addToCartData, setAddToCardData] = useState([])
  const [UserOrderedProducts, setUserOrderProducts] =useState([])
  const [userDataInfo] = useContext(UserContext)
  const handleClick = () => {
    history.push('/login')
  }
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const addToCartOparation = ()=>{
    
  // }
//   const loadCartProduct = async()=>{
//     await axios.get('https://guarded-badlands-63189.herokuapp.com/cartProduct', {
//       headers: {
//         email: userDataInfo.email
//       }
//     })
//       .then(res => {
//         setAddToCardData(res.data)
//       })
//   }
//   const loadUserProduct = async()=>{
//     await axios.get('https://guarded-badlands-63189.herokuapp.com/products/userOrderProducts', {
//       headers: {
//         email: userDataInfo.email
//       }
//     })
//       .then(res => {
//         setUserOrderProducts(res.data)
//   })
// }
  useEffect(()=>{
    axios.get('https://guarded-badlands-63189.herokuapp.com/cartProduct', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setAddToCardData(res.data)
      })
  },[addToCartData,userDataInfo.email])
  useEffect(()=>{
    axios.get('https://guarded-badlands-63189.herokuapp.com/products/userOrderProducts', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setUserOrderProducts(res.data)
  })
  },[addToCartData,userDataInfo.email])
  const addToCart = async () => {

    if (userDataInfo.isSignedIn) {
     
        
        if(addToCartData.length >= 1){
          history.push('/addToCart')
        }
    }

    else{
      history.push('/login')
    }
   
  }
  return (
    <div className="nav_margin">
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="logo">
            Fake-Shop
          </Typography>
          <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Box component="span" mr={1}> <Button size="small" color="inherit" onClick={() => history.push('/')}>Home</Button></Box>
            {/*           
            <Box component="span" mr={1}>
              <IconButton color="inherit" onClick={() => history.push('/addToCart')}>
                <ShoppingCartIcon />
              </IconButton>
            </Box> */}
            {!userDataInfo.isSignedIn ? <Button size="small" color="inherit" onClick={handleClick}>Login</Button> : <Avatar alt="Remy Sharp" src={userDataInfo.photoURL} className={classes.small} />}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Box component="span" mr={2}>
            <Typography variant="h6">
              Fake-Shop
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {addToCartData.length === 0 ?<ListItem button disabled onClick={addToCart}>
            <ListItemIcon><Badge className="iconCount" color="secondary" badgeContent={0} showZero ><AddShoppingCartRoundedIcon /></Badge></ListItemIcon>
            <ListItemText primary="Cart Products" />
          </ListItem>:<ListItem button onClick={addToCart}>
            <ListItemIcon><Badge className="iconCount" badgeContent={addToCartData.length} color="secondary"><AddShoppingCartRoundedIcon /></Badge></ListItemIcon>
            <ListItemText primary="Cart Products" />
          </ListItem>}
        </List>
        <List>
          {UserOrderedProducts.length === 0 ?  <ListItem button disabled onClick={() => history.push(userDataInfo.email ? '/myOrderedProducts' : '/login')}>
            <ListItemIcon><Badge color="secondary" badgeContent={0} showZero ><ShoppingCartIcon /></Badge></ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>: <ListItem button onClick={() => history.push(userDataInfo.email ? '/myOrderedProducts' : '/login')}>
            <ListItemIcon><Badge badgeContent={UserOrderedProducts.length} color="secondary"><ShoppingCartIcon /></Badge></ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;