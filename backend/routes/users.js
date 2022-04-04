const router = require('express').Router();
const { validateProfileInfo, validateAvatar, validateUserId } = require('../middlewares/validation');

const {
  getUsers,
  getMyProfile,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyProfile);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateProfileInfo, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
