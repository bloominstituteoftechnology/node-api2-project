import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import axios from 'axios';
import Card from './Card';
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';

export default function DisplayPosts() {
	const [postData, setPostData] = useState([]);
	const [addDialogOpen, setAddDialogOpen] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:5000/api/posts').then((res) => {
			// console.log(res.data);
			setPostData(res.data);
		});
	}, []);

	return (
		<React.Fragment>
			{postData.map((post) => {
				return (
					<Card
						key={post.id}
						title={post.title}
						contents={post.contents}
						id={post.id}
						postData={postData}
						setPostData={setPostData}
					/>
				);
			})}
			<Button
				variant='outlined'
				color='primary'
				size='large'
				onClick={() => setAddDialogOpen(true)}
			>
				Add New Post
			</Button>
			<Dialog
				open={addDialogOpen}
				onClose={() => setAddDialogOpen(false)}
				aria-labelledby='Add New Post'
			>
				<DialogTitle id='posts'>Add New Post</DialogTitle>
				<DialogContent>
					<PostForm
						postData={postData}
						setPostData={setPostData}
						setAddDialogOpen={setAddDialogOpen}
						edit={false}
					/>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
}
