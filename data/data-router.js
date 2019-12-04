const express = require("express");
const Data = require("./db.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
	console.log(req.query);
	Data.find(req.query)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: "error retrieving data" });
		});
});

router.post("/", (req, res) => {
	const { title, contents } = req.body;
	const postData = { title, contents };
	if (!(title && contents)) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	} else {
		Data.insert(postData)
			.then(postData => {
				res.status(201).json({ message: "post created", postData });
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					message: "There was an error while saving the post to the database"
				});
			});
	}
});

router.get("/:id", (req, res) => {
	const id = req.params.id;

	Data.findById(id)
		.then(post => {
			if (!post[0]) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			} else {
				res.status(200).json({ message: "post found", post });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: "The post information could not be retrieved."
			});
		});
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;

	Data.remove(id)
		.then(post => {
			if (!post[0]) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist. " });
			} else {
				res.status(200).json({ message: "post deleted" });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: "The post could not be removed"
			});
		});
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    Data.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json({message: "post updated", changes});
        } else {
          res.status(404).json({ message: "The post could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error updating the hub"
        });
      });
  });

  

module.exports = router;
