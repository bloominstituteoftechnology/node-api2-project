module.exports = () => {
	return (req, res, next) => {
		if (!req.body.title || !req.body.contents) {
			return res.status(400).json({
				errorMessage: "Please provide title and contents for the post.",
			});
		}
		next();
	};
};
