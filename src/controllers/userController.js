import User from "../models/User.js";

export const getJoin = (req, res) => res.render("join", {pageTitle: 'Join'});
export const postJoin = async (req, res) => {
  const {name, email, username, password, password2, location} = req.body;
  const exists = await User.exists({$or: [{username}, {email}]});
  const pageTitle = "Join";
  if(password !== password2) {
    return res.render("join",  {pageTitle, errorMessage: "Password confirmation doesn't match."});
  }
  if(exists) {
    return res.render("join",  {pageTitle, errorMessage: "This username/email is already taken."});
  }

  await User.create({
    name, email, username, password, location
  })
  res.redirect("/login");
};
export const login = (req, res) => res.send("Login");
export const edit = (req, res) => res.send("Edit User.");
export const remove = (req, res) => res.send("Delete User.");
export const logout = (req, res) => res.send("Log out.");
export const see = (req, res) => res.send("See user.");