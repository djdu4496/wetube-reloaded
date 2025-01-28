import Video from "../models/Video.js";


export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        console.log(videos);
        res.render("home", {pageTitle: "Home", videos});
    }
    catch {
        return ers.render("server-error");
    }
}
export const watch = (req, res) => {
    const { id } = req.params;
    res.render("watch", {pageTitle: `Watching ${video.title}`});
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
    // try {

        const { title, description, hashtags } = req.body;
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map(word => word.trim()).map(word => `#${word}`),
            createdAt: "Date.now()",
            meta: {
                views: 0,
                rating: 0
            }
        })
    // }
    // catch {

    // }
    return res.redirect("/");
}