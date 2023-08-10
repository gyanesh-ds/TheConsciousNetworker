require("dotenv").config();
require("./db/conn");
const express = require("express");
const User = require("./model/schema");
const Quote = require("./model/NewQuote");
require("./db/conn");
const axios = require("axios");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);

const secret = process.env.JWT_SECRET;
const CLIENT_ID = process.env.GIT_CLIENT_ID;
const CLIENT_SECRET = process.env.GIT_CLIENT_SECRET;
const client_id = process.env.IN_CLIENT_ID;
const client_secret = process.env.IN_CLIENT_SECRET;

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //add to avoid CORS error
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const Post = require("./model/NewPost");
const Events = require("./model/NewEvent");

app.get("/getGitAccessTokenUserdata", async (req, res) => {
  const authname = "GitHub";

  const accesstoken = req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          const email = data.email;
          const username = data.name;
          const picture = data.avatar_url;
          if (data.name != null || data.name != "") {
            const user = await User.find({ authname })
              .findOne({ email })
              .exec();
            if (user) {
              jwt.sign(
                {
                  uname: user.username,
                  id: user.id,
                  uemail: user.email,
                  upic: user.picture,
                },
                secret,
                {},
                (err, token) => {
                  if (err) throw err;
                  res.cookie("token", token).json("ok");
                }
              );
            } else {
              let password = bcrypt.hashSync(email + username, salt);
              const userDocs = await User.create({
                username,
                authname,
                accesstoken,
                email,
                picture,
                password,
              });
              if (userDocs) {
                const users = await User.find({ authname })
                  .findOne({ email })
                  .exec();
                jwt.sign(
                  {
                    uname: users.username,
                    id: users.id,
                    uemail: users.email,
                    upic: users.picture,
                  },
                  secret,
                  {},
                  (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json("ok");
                  }
                );
              } else {
                return res.status.json({ error: "mongodb error" });
              }
            }
          }
        });
    });
});

app.post("/facebookauth", async (req, res) => {
  const { userObj } = req.body;
  if (userObj) {
    const email = userObj.email;
    const username = userObj.name;
    const picture = userObj.picture.data.url;
    const access_token = userObj.accessToken;

    const authname = "Facebook";

    const user = await User.find({ authname }).findOne({ email }).exec();
    if (user) {
      jwt.sign(
        {
          uname: user.username,
          id: user.id,
          uemail: user.email,
          upic: user.picture,
        },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json("ok");
        }
      );
    } else {
      let password = bcrypt.hashSync(email + username, salt);
      const userDocs = await User.create({
        username,
        authname,
        access_token,
        email,
        picture,
        password,
      });
      if (userDocs) {
        const users = await User.find({ authname }).findOne({ email }).exec();
        jwt.sign(
          {
            uname: users.username,
            id: users.id,
            uemail: users.email,
            upic: users.picture,
          },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json("ok");
          }
        );
      } else {
        return res.status.json({ error: "mongodb error" });
      }
    }
  }
});

app.post("/googleauth", async (req, res) => {
  const { userObj, access_token } = req.body;
  if (userObj) {
    const email_verified = userObj.email_verified;
    const email = userObj.email;
    const username = userObj.name;
    const picture = userObj.picture;
    const authname = "Google";

    if (email_verified) {
      const user = await User.find({ authname }).findOne({ email }).exec();
      if (user) {
        jwt.sign(
          {
            uname: user.username,
            id: user.id,
            uemail: user.email,
            upic: user.picture,
          },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json("ok");
          }
        );
      } else {
        let password = bcrypt.hashSync(email + username, salt);
        const userDocs = await User.create({
          username,
          authname,
          access_token,
          email,
          picture,
          password,
        });
        if (userDocs) {
          const users = await User.find({ authname }).findOne({ email }).exec();
          jwt.sign(
            {
              uname: users.username,
              id: users.id,
              uemail: users.email,
              upic: users.picture,
            },
            secret,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json("ok");
            }
          );
        } else {
          return res.status.json({ error: "mongodb error" });
        }
      }
    }
  }
});
app.get("/linkedinauth", async (req, res) => {
  const authname = "linkedin";
  const code = req.query.code;
  try {
    // Exchange authorization code for access token
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken?code=" +
        code +
        "&grant_type=authorization_code&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret +
        "&redirect_uri=http://localhost:3000/pagefeed",
      {
        responseType: "json",
      }
    );
    const accessToken = response.data.access_token;
    // Get user data and email address
    const [userData, emailData, imageData] = await Promise.all([
      axios.get("https://api.linkedin.com/v2/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "cache-control": "no-cache",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }),
      axios.get(
        "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "cache-control": "no-cache",
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }
      ),
      axios.get(
        "https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "cache-control": "no-cache",
            "X-Restli-Protocol-Version": "2.0.0",
          },
          responseType: "json",
        }
      ),
    ]);
    const firstName = userData.data.firstName.localized.en_US;
    const lastName = userData.data.lastName.localized.en_US;
    const email = emailData.data.elements[0]["handle~"].emailAddress;
    const profilePic =
      imageData.data.profilePicture["displayImage~"].elements[0].identifiers[0]
        .identifier;
    // Check if the user already exists in the database
    const user = await User.find({ authname }).findOne({ email }).exec();
    if (user) {
      jwt.sign(
        {
          uname: user.username,
          id: user.id,
          uemail: user.email,
          upic: user.picture,
        },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json("ok");
        }
      );
    } else {
      // Create a new user in the database
      const password = bcrypt.hashSync(email + firstName, salt);
      const userDocs = await User.create({
        username: `${firstName} ${lastName}`,
        authname,
        access_token: accessToken,
        email,
        picture: profilePic,
        password,
      });
      if (userDocs) {
        const newUser = await User.find({ authname }).findOne({ email }).exec();
        jwt.sign(
          {
            uname: newUser.username,
            id: newUser.id,
            uemail: newUser.email,
            upic: newUser.picture,
          },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json("ok");
          }
        );
      } else {
        return res.status.json({ error: "mongodb error" });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Cooke Cleared");
});

app.post("/newpost", async (req, res) => {
  const { title, desc, categ, authorname, authorpic, image } = req.body;
  try {
    const postDoc = await Post.create({
      title: title,
      description: desc,
      category: categ,
      authorname: authorname,
      authorpic: authorpic,
      image: image,
    });
    postDoc.save();
    res.json(postDoc);
  } catch (error) {}
});

app.get("/getpost", async (req, res) => {
  res.json(await Post.find());
});

app.post("/newevent", async (req, res) => {
  const {
    usereventcategory,
    usereventduration,
    userevententryage,
    usereventlanguage,
    usereventlean,
    usereventorgname,
    usereventname,
    usereventdescription,
    usereventlocation,
    usereventtime,
    image,
    usereventorggmail,
  } = req.body;
  const eventDoc = await Events.create({
    usereventname,
    usereventdescription,
    usereventlocation,
    usereventtime,
    eventimg: image,
    usereventorggmail,
    usereventduration,
    userevententryage,
    usereventlanguage,
    usereventlean,
    usereventorgname,
    usereventcategory,
  });
  res.json(eventDoc);
});
app.post("/newquote", async (req, res) => {
  const { quote, author } = req.body;
  const quoteDoc = Quote.create({
    quote: quote,
    author: author,
  });
  res.json(quoteDoc);
});
app.post("/newregister", async (req, res) => {
  const { eid, uid } = req.body;
  const findStat = await Events.findOne({ _id: eid }).findOne({
    usersregisterd: uid,
  });
  if (findStat == null) {
    const updtaeregDoc = await Events.updateOne(
      { _id: eid },
      { $push: { usersregisterd: uid } }
    );
    res.json(updtaeregDoc);
  } else {
    res.json();
  }
});
app.post("/checkreg", async (req, res) => {
  const { eid, uid } = req.body;
  const checkR = await Events.findOne({ _id: eid }).findOne({
    usersregisterd: uid,
  });
  res.json(checkR);
});

app.post("/likedislike", async (req, res) => {
  const { pid, uid } = req.body;
  const findStat = await Post.findOne({ _id: pid }).findOne({
    usersliked: uid,
  });
  if (findStat == null) {
    const updtaeregDoc = await Post.updateOne(
      { _id: pid },
      { $push: { usersliked: uid } }
    );
    res.json(updtaeregDoc);
  } else {
    const dislike = await Post.updateOne(
      { _id: pid },
      {
        $pull: {
          usersliked: uid,
        },
      }
    );
    res.json(dislike);
  }
});
app.post("/checklike", async (req, res) => {
  const { pid, uid } = req.body;
  const checkL = await Post.findOne({ _id: pid }).findOne({
    usersliked: uid,
  });
  res.json(checkL);
});
app.get("/getevent", async (req, res) => {
  res.json(await Events.find());
});
app.get("/getquote", async (req, res) => {
  res.json(await Quote.find());
});

app.get("/search", async (req, res) => {
  const title = req.query.key
    ? {
        usereventname: { $regex: req.query.key, $options: "i" },
      }
    : {};
  const searchDoc = await Events.find(title);
  res.json(searchDoc);
});

app.get("/newevent/:id", async (req, res) => {
  const { id } = req.params;
  const eventDoc = await Events.findById(id);
  res.json(eventDoc);
});

app.listen(4000, function () {
  console.log("listening on port 4000!");
});
