import React from 'react';
import {
	TextField,
	Button,
	Box,
	makeStyles,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const useStyles = makeStyles({
	container: {
		padding: '10%',
	},
	field: {
		margin: '20px auto',
	},
	heading: {
		textAlign: 'center',
	},
});

export default function Form({
	id,
	comments,
	setComments,
	setCommentDialogOpen,
}) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const classes = useStyles();
	const commentSubmit = (data) => {
		axios
			.post(`http://localhost:5000/api/posts/${id}/comments`, data)
			.then((res) => {
				setComments([...comments, res.data]);
				setCommentDialogOpen(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	if (formState.isSubmitting) {
		return (
			<Box className={classes.container}>
				<Typography>Loading...</Typography>
				<CircularProgress color='secondary' />
			</Box>
		);
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(commentSubmit)}
			className={classes.container}
		>
			<TextField
				fullWidth={true}
				className={classes.field}
				autoFocus
				variant='outlined'
				type='text'
				id='text'
				name='text'
				inputRef={register({ required: 'Required' })}
				// defaultValue={props.title ? props.title : ''}
				label='Text:'
				error={errors.text ? true : false}
				helperText={errors.text ? errors.text.message : null}
			/>

			<Button
				fullWidth
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				disabled={!formState.isValid}
			>
				Submit
			</Button>
		</Box>
	);
}
