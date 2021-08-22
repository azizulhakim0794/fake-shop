import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    cardActionArea:{
      height:"100%",
    },
    card:{
      height:"100%",
      display: 'flex',
      flexDirection: 'column',

    },
     cardGrid:{
      padding: '20px 0'
    },
    cardMedia:{
      paddingTop:"56.25%",
      display: "block",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    cardContent:{
      flexGrow:"1",
      // margin:"20px 20px"
    },title:{
      width:"300px"
    },
    height100:{
      height: "100px"
    },
    mb5:{
      marginBottom:"50px"
    }
  
  }));
  export default useStyles;