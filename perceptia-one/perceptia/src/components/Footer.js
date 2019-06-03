import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
   footer: {
     marginTop: theme.spacing(8),
     borderTop: `1px solid ${theme.palette.divider}`,
     padding: `${theme.spacing(6)}px 0`,
     textAlign: 'center',
     maxWidth: '99%'
   },
 });

const footers = [
   {
     title: 'About',
     options: [{
       title: 'Team',
       url: 'https://www.capstone.perceptia.info/#team'
     }, {title: 'Contact Us', url: 'mailto:uw-thalesians@u.washington.edu'}],
   },
   {
     title: 'Explore',
     options: [{title: 'AnyQuiz', url: 'http://students.washington.edu/long27km/any_quiz/'}],
   },
   {
     title: 'Resources',
     options: [{title: 'Source Code', url: 'https://www.capstone.perceptia.info/#code'}],
   },
   {
     title: 'Legal',
     options: [{title:'Privacy policy', url:''}, {title:'Terms of use',url:''}],
   },
 ];

 function Footer(props) {
   const { classes } = props;
 
   return (
      <footer className={classNames(classes.footer, classes.layout)}>
      <Grid container spacing={1} justify="space-evenly">
         {footers.map(footer => (
            <Grid item xs key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
               {footer.title}
            </Typography>
            {footer.options.map(item => (
               <Typography key={item.title} variant="subtitle1" color="textSecondary">
                 <a href={item.url}>{item.title}</a>
               </Typography>
            ))}
            </Grid>
         ))}
      </Grid>
      </footer>
   );
 }
 
 Footer.propTypes = {
   classes: PropTypes.object.isRequired,
 };
 
 export default withStyles(styles)(Footer);
 