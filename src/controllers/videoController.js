import Video from "../models/Video.js";


export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", {pageTitle: "Home", videos});
    }
    catch {
        return ers.render("server-error");
    }
}
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).exec();
    res.render("watch", {pageTitle: `Watching ${video.title}`, video});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    res.render("edit", {pageTitle: `Editing: ${video.title}`});
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: 'Upload Video', url: req.originalUrl});
}

export const postUpload = async (req, res) => {
    try {
        const { title, description, hashtags } = req.body;
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map(word => word.trim()).map(word => `#${word}`),
            createdAt: Date.now()
        })
        return res.redirect("/");
    }
    catch(error) {
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message})
    }
}