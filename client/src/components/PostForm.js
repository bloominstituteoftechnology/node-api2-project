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

export default function Form(props) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const classes = useStyles();
	const submitAdd = (data) => {
		axios
			.post('http://localhost:5000/api/posts', data)
			.then((res) => {
				props.setPostData([...props.postData, res.data]);
				props.setAddDialogOpen(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	const submitEdit = (data) => {
		axios
			.put(`http://localhost:5000/api/posts/${props.id}`, data)
			.then((res) => {
				console.log(res);
				const edited = props.postData.map((post) => {
					if (res.data[0].id === post.id) {
						return res.data[0];
					} else {
						return post;
					}
				});
				props.setPostData(edited);
				props.setEditDialogOpen(false);
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
			onSubmit={handleSubmit(props.edit ? submitEdit : submitAdd)}
			className={classes.container}
		>
			<TextField
				fullWidth={true}
				className={classes.field}
				autoFocus
				variant='outlined'
				type='text'
				id='title'
				name='title'
				inputRef={register({ required: 'Required' })}
				defaultValue={props.title ? props.title : ''}
				label='Title:'
				error={errors.title ? true : false}
				helperText={errors.title ? errors.title.message : null}
			/>

			<TextField
				fullWidth={true}
				className={classes.field}
				variant='outlined'
				type='text'
				id='contents'
				name='contents'
				inputRef={register({ required: 'Required' })}
				defaultValue={props.contents ? props.contents : ''}
				label='Contents:'
				error={errors.contents ? true : false}
				helperText={errors.contents ? errors.contents.message : null}
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
