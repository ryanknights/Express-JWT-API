const Post = require('../models/Post');

exports.retrievePosts = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      return res.send(500, 'There was a problem retrieving the posts');
    }
    return res.json({ posts });
  });
};

exports.retrievePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.send(500, 'There was a problem retrieving the post');
    }

    if (!post) {
      return res.send(404, 'No post found');
    }

    return res.json({ post });
  });
};

exports.addPost = (req, res, next) => {
  const title = req.body.title || '';
  const content = req.body.content || '';

  if (title === '' || content === '') {
    return res.status(400).send('Please enter a title and content.');
  }

  const newPost = new Post({
    title,
    content,
    userId: req.user.userid,
  });

  return newPost.save()
    .then((post) => res.json({ post }))
    .catch(() => res.send(500, 'There was a problem saving the post'));
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }, (err, results) => {
    if (err) {
      return res.send(500, 'There was a problem deleting the post');
    }

    if (!results) {
      return res.send(404, 'No post deleted');
    }

    return res.json({ success: true });
  });
};

exports.updatePost = () => {};
