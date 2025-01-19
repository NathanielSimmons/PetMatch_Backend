const User = require('../models/User');
const bcrypt = require('bcryptjs');
const s3 = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

exports.signup = async (req, res) => {
  try {
    const { username, name, email, password, aboutMe } = req.body;
    const { file } = req;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    let profilePicUrl = null;
    if (file) {
      const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;

      // Upload to AWS S3
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload the file to S3 and get the file URL
      const data = await s3.upload(params).promise();
      profilePicUrl = data.Location;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, password: hashedPassword, profilePic: profilePicUrl, aboutMe });
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const formattedUser = user.toObject();
    delete formattedUser.password;
    delete formattedUser.__v;
    delete formattedUser.createdAt;
    delete formattedUser.updatedAt;

    res.status(200).json(formattedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password -__v -createdAt -updatedAt');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const { file } = req;
    let profilePicUrl = null;
    if (file) {
      const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;

      // Upload to AWS S3
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload the file to S3 and get the file URL
      const data = await s3.upload(params).promise();
      profilePicUrl = data.Location;
    }
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }
    if (profilePicUrl) {
      updateData.profilePic = profilePicUrl;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const formattedUser = updatedUser.toObject();
    delete formattedUser.password;
    delete formattedUser.__v;
    delete formattedUser.createdAt;
    delete formattedUser.updatedAt;

    res.status(200).json({ message: 'User profile updated successfully', user: formattedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};