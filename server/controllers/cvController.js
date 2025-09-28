import Cv from "../models/Cv.js";


// POST 
export const createCv = async (req, res) => {
    const { title, data, layout, customStyles, visibleSections } = req.body;
    console.log('Incoming body:', req.body);
    try {
        const newCv = await Cv.create({
            user: req.user.id,
            title,
            data,
            layout,
            customStyles,
            visibleSections,

        });
        console.log(newCv);
        res.status(201).json(newCv);
    }
    catch (err) {
       
        res.status(500).json( err.message );
    }
};

//GET /api/cv/all

export const getAllCvs = async (req, res) => {
    try {
        const cvs = await Cv.find({ user: req.user._id });
        res.status(200).json(cvs);
    }
    catch (err) {
        req.status(500).json({ error: err.message });
    }
}
    


// GET /api/cv/:id

export const getSingleCv = async (req, res) => {

    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        if (cv.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Unauthorized' });
        res.status(200).json({
            formData:cv.data,
            customStyles:cv.customStyles || {},
            visibleSections: cv.visibleSections || {},
            layout: cv.layout || "Layout 1",
            title: cv.title || ''
        });
    }
    catch (err) {
        req.status(500).json({ error: err.message })
    }

}


// PUT /api/cv/:id

export const updateCv = async (req, res) => {

    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv || cv.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Unauthorized' });

        const { formData, layout, customStyles, visibleSections,title } = req.body;

        cv.title = title || cv.title;
        cv.formData = formData;
        cv.layout = layout;
        cv.customStyles = customStyles;
        cv.visibleSections = visibleSections;

        await cv.save();
        res.status(200).json(cv);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }


};


// DELETE /api/cv/:id

export const deleteCv = async (req, res) => {

    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv || cv.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Unauthorized' });

        await Cv.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'CV deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}