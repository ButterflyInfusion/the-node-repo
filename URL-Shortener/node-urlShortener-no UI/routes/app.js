const express = require('express');

const router = express.Router();

//@route    GET/:code
//@desc     Redirect to long/original URL

router.get(':/code', async (req, res) => {
  try {
      const url = await Url.findOne({urlCode: req.params});

      if (url) {
          return res.redirect(url.longUrl);
      } else {
          return res.status(404).json('No url found');
      }
  } catch(err) {
      console.log(err);
      res.status(500).json('Server Error')
  }
})


module.exports = router;