import User from "../models/User.js";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle: 'Join'});
export const postJoin = async (req, res) => {
  const {name, email, username, password, password2, location} = req.body;
  const exists = await User.exists({$or: [{username}, {email}]});
  const pageTitle = "Join";
  if(password !== password2) {
    return res.status(404).render("join",  {pageTitle, errorMessage: "Password confirmation doesn't match."});
  }
  if(exists) {
    return res.status(404).render("join",  {pageTitle, errorMessage: "This username/email is already taken."});
  }
  try {
    await User.create({
      name, email, username, password, location
    })
    res.redirect("/login");
  } catch (error) {
    return res.status(404).render("join", { pageTitle, errorMessage: error._message})
  }
};
export const getLogin = (req, res) => {
  return res.render("login", {pageTitle: "Login", errorMessage: ""})
}
export const postLogin = async (req, res) => {
  // check if account exists
  // check if password correct
  const {username, password} = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({username});
  if(!user){
    return res.status(400).render("login", {pageTitle, errorMessage: "An account with this username does not exists."})
  }
  const match = await bcrypt.compare(password, user.password);

  if(!match) {
    return res.status(400).render("login", {pageTitle, errorMessage: "Wrong password."})
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
}

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup:false,
    scope:"read:user user:email"
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code
  } 
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
       Accept: "application/json",
      },
  })
).json();
  if("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com"
    const userData = await(
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        }
    })).json();
    console.log(userData);
    const emailData = await(
        await fetch(`${apiUrl}/user/emails`, {
          headers: {
          Authorization: `token ${access_token}`,
          },
        })
    ).json();
    const email = emailData.find(email => email.primary === true && email.verified === true);
    if(!email) {
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
}

export const edit = (req, res) => res.send("Edit User.");
export const remove = (req, res) => res.send("Delete User.");
export const logout = (req, res) => res.send("Log out.");
export const see = (req, res) => res.send("See user.");