import Video from "../models/Video.js";


export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", {pageTitle: "Home", videos});
    }
    catch {
        return res.render("server-error");
    }
}
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.render("404", {pageTitle: `Video Not found.`});
    }
    return res.render("watch", {pageTitle: `Watching ${video.title}`, video});
}
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.render("404", {pageTitle: `Video Not found.`});
    }
    return res.render("edit", {pageTitle: `Editing: ${video.title}`, video}); 
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id:id});
    if(!video) {
        return res.render("404", {pageTitle: `Video Not found.`});
    }
    await Video.findByIdAndUpdate(id, {
	    title,
	    description,
	    hashtags: Video.formatHashtags(hashtags)
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: 'Upload Video', url: req.originalUrl});
}

export const postUpload = async (req, res) => {
    try {
        const { title, description, hashtags } = req.body;
        console.log("postUpload hashtags: ",  hashtags);
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            createdAt: Date.now()
        })
        return res.redirect("/");
    }
    catch(error) {
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message})
    }
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.render("404", {pageTitle: `Video Not found.`});
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/"); 
}