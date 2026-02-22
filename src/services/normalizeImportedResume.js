

export function normalizeImportedResume(data = {}) {
    const toString = (v) => (typeof v === "string" ? v.trim() : "");

    const normalizePointsBlock = (block, fallbackTitle = "") => {
        const points = Array.isArray(block)
            ? block.map(toString).filter(Boolean)
            : block && typeof block === "object"
                ? (Array.isArray(block.points) ? block.points : []).map(toString).filter(Boolean)
                : [];

        if (points.length === 0) return { title: "", points: [] };

        return {
            title: (block && typeof block === "object" ? toString(block.title) : "") || fallbackTitle,
            points,
        };
    };


    return {
        generalInfo: {
            name: data.generalInfo?.name || "",
            email: data.generalInfo?.email || "",
            phone: data.generalInfo?.phone || "",
            location: data.generalInfo?.location || "",
            github: data.generalInfo?.github || "",
            linkedin: data.generalInfo?.linkedin || "",
            website: data.generalInfo?.website || "",
            title: data.generalInfo?.title || ""
        },

        summary: {
            summary: data.summary?.summary || ""
        },

        education: (data.education || []).map(e => ({
            school: e.school || e.institution || "",
            degree: e.degree || "",
            location: e.location || "",
            startDate: e.startDate || e.from || e.start || "",
            endDate: e.endDate || e.to || e.end || "",
            achievements: normalizePointsBlock(e.achievements, "Achievements")
        })),

        experience: (data.experience || []).map(e => ({
            company: e.company || "",
            position: e.position || e.jobTitle || e.role || "",
            location: e.location || "",
            startDate: e.startDate || e.from || e.start || "",
            endDate: e.endDate || e.to || e.end || "",
            achievements: normalizePointsBlock(e.achievements, "Achievements")
        })),

        skills: (data.skills || []).map(s => ({
            skill: typeof s === "string" ? s : (s?.skill || "")
        })),

        projects: (data.projects || []).map(p => ({
            title: p.title || p.name || "",
            description: p.description || "",
            link: p.link || p.liveLink || p.url || "",
            skillsUsed: Array.isArray(p.skillsUsed)
                ? p.skillsUsed
                : typeof p.techStack === "string"
                    ? p.techStack.split(",").map(x => x.trim()).filter(Boolean)
                    : [],
            keyFeatures: normalizePointsBlock(
                p.keyFeatures || p.features || p.highlights,
                "Key Features"
            )
        })),

        languages: (data.languages || []).map(l => ({
            language: typeof l === "string" ? l : l.language || "",
            proficiency: typeof l === "string" ? "" : l.proficiency || ""
        })),

        hobbies: (data.hobbies || []).map(h => ({
            title: typeof h === "string" ? h : h.title || "",
            description: typeof h === "string" ? "" : h.description || ""
        })),

        custom: data.custom ?? {
            title: "",
            type: "text",
            description: "",
            listItems: [""],
            phone: "",
            email: "",
            links: [""],
        }
    }
}