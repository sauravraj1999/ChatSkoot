import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { StoreContext } from './Store';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  topicWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px',
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%',
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  // StoreContext
  const {allChats, sendChatAction, user} = useContext(StoreContext);
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [textValue, setTextValue] = useState('');
  
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat app
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicWindow}>
            <List>
              {
                topics.map(topic => (
                  <ListItem onClick={e => setActiveTopic(e.target.innerText)} key={topic} button>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))
              }      
            </List>
          </div>
          <div className={classes.chatWindow}>
            <List>
              {
                allChats[activeTopic].map((chat, i) => (
                  <div className={classes.flex} key={i}>
                    <Chip label={chat.from} className={classes.chip} />
                    <Typography variant='body1'>{chat.msg}</Typography>
                  </div>
                ))
              }      
            </List>
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a chat"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => {
              sendChatAction({from: user, msg: textValue, topic: activeTopic});
              setTextValue('');
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
