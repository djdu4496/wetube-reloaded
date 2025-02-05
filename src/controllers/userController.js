import User from "../models/User.js";

export const getJoin = (req, res) => res.render("join", {pageTitle: 'Join'});
export const postJoin = async (req, res) => {
  console.log(req.body);
  const {name, email, username, password, location} = req.body;
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