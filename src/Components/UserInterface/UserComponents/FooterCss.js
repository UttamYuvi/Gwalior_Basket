import React from 'react';
import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles({

    mainFooterContainer: {
    width: '100%',
    background: 'rgb(247, 247, 247)',
  },


  linkContainer: {
    display: 'flex',
    width: '90%',
    flexWrap: 'wrap', 
    marginLeft:'16px'
  },

  linkIcons: {
    display: 'flex',
    
  },


  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4%',
    paddingTop: '1%'
  },

  linksColumn: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '1%'
  },


  links2: {
    display: 'flex',
    padding: '5%',
    paddingTop: '5%',


  },

  aStyles: {
    textDecoration: 'none',
    color:'#434343',
    '&:hover': {
      color: '#c00',
      transition:'.5s'
    },
    lineHeight: '180%'
  },

  aStylesSM: {
    textDecoration: 'none',
    color:'#434343',
    '&:hover': {
      color: '#c00',
      transition:'.5s'
    },
    lineHeight: '180%',
  },

  aStylesFoot: {
    textDecoration: 'none',
    color:'#fff',
    '&:hover': {
      color: '#c00',
      transition:'.5s'
    },
    lineHeight: '180%'
  },

  iconStyles: {
    color:'#fff',
    '&:hover': {
      color: '#c00',
      transition:'.5s'
    },
    textDecoration: 'none',
  },

  
  bottom: {
    textAlign: 'center',
    padding: '1%'
  },
})  