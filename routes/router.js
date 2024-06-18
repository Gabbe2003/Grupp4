require("dotenv").config();
const express = require("express");
const router = express.Router();
const allMovies = require("../crud/getAllProducts");
const getOneMovie = require("../crud/getOneProduct");
const registerUser = require("../userOperations/register");
const loginUser = require("../userOperations/loginUser");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.use(express.static("public")); //finns inte i current vid merge(inget jag lagt dit//Pellan)
router.use(express.json()); //som ovan
const jwt = require("jsonwebtoken");

router.get("/getAllMovies", allMovies.getAllMovies);
router.get("/getAllMovies/:movieId", getOneMovie.getMovieById);
router.get("/getAllMovies?page=2", allMovies.getAllMovies);
router.post("/registerUser", registerUser.registerUser);
router.post("/loginUser", loginUser.loginUser);

const calculateOrderAmount = (items) => {
  if (items.length == 0) return 100 * 100;
  const totalAmount = items.reduce((acc, product) => acc + product.price, 0);
  return totalAmount * 100;
};
router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "sek",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
const User = require("../models/user");
router.post("/google-login", async (req, res) => {
  const { tokenId } = req.body;
  console.log("Received tokenId:", tokenId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;
    console.log("Google payload:", payload);

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: email.split("@")[0],
        email: email,
        password: "",
        googleId: payload.sub,
      });

      await user.save();
    }

    console.log("User from DB:", user);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Google login successful.", token });
  } catch (error) {
    console.error("Google login failed:", error);
    res.status(500).json({ error: "Google login failed." });
  }
});
module.exports = router;
