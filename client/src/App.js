import React from 'react';
import DisplayPosts from './components/DisplayPosts';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

function App() {
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<DisplayPosts />
		</Container>
	);
}

export default App;
