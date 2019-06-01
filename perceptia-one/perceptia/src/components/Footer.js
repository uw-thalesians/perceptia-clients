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
   },
 });

const footers = [
   {
     title: 'About',
     description: ['Team', 'Contact us'],
   },
   {
     title: 'Explore',
     description: ['AnyQuiz', 'Summary', 'Knowledge Graph'],
   },
   {
     title: 'Resources',
     description: ['Documentation', 'Related Research', 'FAQ'],
   },
   {
     title: 'Legal',
     description: ['Privacy policy', 'Terms of use'],
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
            {footer.description.map(item => (
               <Typography key={item} variant="subtitle1" color="textSecondary">
                  {item}
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
 