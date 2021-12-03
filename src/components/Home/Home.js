import React, { useState, useEffect } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  console.log(' current id: ' + currentId);

  useEffect(() => {
    dispatch(getPosts()); // the state of posts in store redux changes -> cause rerender
    //trigger lấy lại toàn bộ dữ liệu trong database
    console.log('store redux update in App');
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;
