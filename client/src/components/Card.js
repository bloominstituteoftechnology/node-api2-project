import React, { useState, useEffect } from 'react';
import {
	Card as CardBase,
	CardActions,
	CardContent,
	Button,
	Typography,
	makeStyles,
	Dialog,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import axios from 'axios';
import PostForm from './PostForm';
import AddCommentForm from './AddCommentForm';

const useStyles = makeStyles({
	root: {
		width: '50%',
		marginBottom: '15px',
		'&:first-child': {
			marginTop: '50px',
		},
	},
	title: {
		fontSize: 20,
	},
	comment: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function Card({ title, contents, id, postData, setPostData }) {
	const classes = useStyles();
	const [comments, setComments] = useState([]);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [commentDialogOpen, setCommentDialogOpen] = useState(false);

	const deletePost = (id) => {
		axios.delete(`http://localhost:5000/api/posts/${id}`).then((res) => {
			const filteredPosts = postData.filter((post) => post.id !== id);
			setPostData(filteredPosts);
		});
	};

	useEffect(() => {
		axios.get(`http://localhost:5000/api/posts/${id}/comments`).then((res) => {
			setComments(res.data);
			// console.log(res.data);
		});
	}, []);

	return (
		<CardBase className={classes.root} variant='outlined'>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					{title}
				</Typography>
				<Typography variant='body1' component='p'>
					{contents}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small' onClick={() => setEditDialogOpen(true)}>
					Edit
				</Button>
				<Button size='small' onClick={() => deletePost(id)}>
					Delete
				</Button>
				<Button size='small' onClick={() => setCommentDialogOpen(true)}>
					Add Comment
				</Button>
			</CardActions>
			<CardContent>
				{comments.map((comment) => {
					return (
						<Typography
							key={comment.id}
							variant='body2'
							color='initial'
							className={classes.comment}
						>
							{comment.text}
							<br />
							<br />
						</Typography>
					);
				})}
			</CardContent>
			<Dialog
				open={editDialogOpen}
				onClose={() => setEditDialogOpen(false)}
				aria-labelledby='Edit Post'
			>
				<DialogTitle id='posts'>Edit Post</DialogTitle>
				<DialogContent>
					<PostForm
						postData={postData}
						setPostData={setPostData}
						setEditDialogOpen={setEditDialogOpen}
						edit={true}
						id={id}
						title={title}
						contents={contents}
					/>
				</DialogContent>
			</Dialog>

			<Dialog
				open={commentDialogOpen}
				onClose={() => setCommentDialogOpen(false)}
				aria-labelledby='Add Comment'
			>
				<DialogTitle id='comments'>Add Comment</DialogTitle>
				<DialogContent>
					<AddCommentForm
						comments={comments}
						setComments={setComments}
						setCommentDialogOpen={setCommentDialogOpen}
						id={id}
					/>
				</DialogContent>
			</Dialog>
		</CardBase>
	);
}
