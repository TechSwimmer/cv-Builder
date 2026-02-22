import "dotenv/config";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { OpenAI } from "openai/client.js";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

// import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const DEV_MODE = process.env.AI_DEV_MODE === "true";
const DEV_MODE_DELAY_MS = Number(process.env.AI_DEV_MODE_DELAY_MS ?? 10000)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function extractTextFromPDF(buffer) {
    const uint8 = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8 })
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const strings = textContent.items.map(item => item.str);
        fullText += strings.join(" ") + "\n";
    }

    return fullText;
}


function toArray(value) {
    return Array.isArray(value) ? value : [];
}

function toString(value) {
    if (typeof value !== "string") return "";
    return value
    .replace(/â€“|â€”/g, "-")
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/Â/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(url) {
    const raw = toString(url);
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
}

function cleanSkillToken(token) {
    return toString(token).replace(/^[\s(]+|[\s)]+$/g, "");
}

function normalizeSkillUsed(skillsUsed, techStack) {
    let arr = [];

    if (Array.isArray(skillsUsed)) {
        arr = skillsUsed.map(cleanSkillToken).filter(Boolean);
    } else {
        arr = toString(techStack)
            .split(",")
            .map(cleanSkillToken)
            .filter(Boolean);
    }

    return [...new Set(arr)]
}


function normalisePointsBlock(block, fallbackTitle = "") {
  const titleRaw =
    block && typeof block === "object"
      ? toString(block.title || block.heading || block.subheading)
      : "";

  let points = [];
  if (Array.isArray(block)) {
    points = block.map(toString).filter(Boolean);
  } else if (block && typeof block === "object") {
    points = toArray(block.points || block.items || block.bullets)
      .map(toString)
      .filter(Boolean);
  }

  if (points.length === 0) {
    return { title: "", points: [] }; // key improvement
  }

  return { title: titleRaw || fallbackTitle, points };
}


function normalizeResume(ai) {

    return {
        generalInfo: {
            name: toString(ai.generalInfo?.name) || "",
            email: toString(ai.generalInfo?.email) || "",
            phone: toString(ai.generalInfo?.phone) || "",
            location: toString(ai.generalInfo?.location) || "",
            linkedin: normalizeUrl(ai.generalInfo?.linkedin) || "",
            github: normalizeUrl(ai.generalInfo?.github) || "",
            website: normalizeUrl(ai.generalInfo?.website) || "",
            title: toString(ai.generalInfo?.title) || "",
        },

        summary: {
            summary: toString(ai.summary?.summary) || "",
        },

        education: toArray(ai.education || []).map(e => ({
            school: toString(e.institution || e.school) || "",
            degree: toString(e.degree) || "",
            location: toString(e.location) || "",
            startDate: toString(e.startDate || e.from || e.start) || "",
            endDate: toString(e.endDate || e.to || e.end) || "",
            // achievements: { title: "", points: [""] }
            achievements: normalisePointsBlock(e.achievements, "Achievements")
        })),

        experience: toArray((ai.experience) || []).map(e => ({
            position: toString(e.jobTitle || e.position || e.role) || "",
            company: toString(e.company) || "",
            location: toString(e.location) || "",
            startDate: toString(e.startDate || e.from || e.start) || "",
            endDate: toString(e.endDate || e.to || e.end) || "",
            // achievements: { title: "", points: [""] }
            achievements: normalisePointsBlock(e.achievements, "Achievements")
        })),

        // skills: (ai.skills || []).map(s => ({ skill: s })),

        skills: toArray(ai.skills).map(s => ({
            skill: toString(typeof s === "string" ? s : s.skill)
        })),

        projects: toArray(ai.projects || []).map(p => ({
            title: toString(p.name || p.title) || "",
            link: normalizeUrl(p.liveLink || p.link) || "",
            description: toString(p.description) || "",
            // skillsUsed: Array.isArray(p.techStack) ? p.techStack.split(",").map(t => t.trim()) : [],
            skillsUsed: normalizeSkillUsed(p.skillsUsed, p.techStack),
            keyFeatures: normalisePointsBlock(
                p.keyFeatures || p.features || p.highlights,
                "Key Features"
            )
        })),

        languages: toArray(ai.languages).map(l => ({
            language: toString(typeof l === "string" ? l : l.language),
            proficiency: toString(typeof l === "string" ? "" : l.proficiency)
        })).filter((l) => l.language),

        hobbies: toArray(ai.hobbies).map(h => ({
            title: toString(typeof h === "string" ? h : h.title),
            description: toString(typeof h === "string" ? "" : h.description)

        })),

        custom: null

    };
}


export const parseResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }
        if (DEV_MODE) {
            const delayMs =
                Number.isFinite(DEV_MODE_DELAY_MS) && DEV_MODE_DELAY_MS >= 0
                    ? DEV_MODE_DELAY_MS
                    : 10000;

            await sleep(delayMs)

            const filePath = path.join(__dirname, "../mockResume.json");
            const rawData = fs.readFileSync(filePath, "utf-8");
            const mockData = JSON.parse(rawData);
            if (req.userDoc) {
                req.userDoc.aiUsage.resumeImports += 1;
                await req.userDoc.save();
            }

            return res.json(mockData);
        }


        // extract text from PDF

        const resumeText = await extractTextFromPDF(req.file.buffer);

        // send to AI to structure

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content: `
                    You convert resumes into structured JSON.
                    Return ONLY valid JSON.
                    Structure must match:
                    {
                        "generalInfo": { "name": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "website": "", "title": "" },
                        "summary": { "summary": "" },
                        "education": [
                            {
                                "institution": "",
                                "degree": "",
                                "location": "",
                                "startDate": "",
                                "endDate": "",
                                "achievements": { "title": "", "points": [] }
                            }
                        ],
                        "experience": [
                            {
                                "jobTitle": "",
                                "company": "",
                                "location": "",
                                "startDate": "",
                                "endDate": "",
                                "achievements": { "title": "", "points": [] }
                            }
                        ],
                        "skills": [],
                        "projects": [
                            {
                                "name": "",
                                "liveLink": "",
                                "description": "",
                                "skillsUsed": [],
                                "keyFeatures": { "title": "", "points": [] }
                            }
                        ],
                        "languages": [{"language":"", "proficiency": ""}],
                        "hobbies": [{"title":"", "description": ""}]
                    }
                    
                    Rules:
                    - Do not invent data. If missing use empty string.
                    - Keep dates if present in resume.
                    - If bullets exist under project / education / experience, keep them in points.
                    - If heading or sub-heading is missing for project / education / experience but bullet points or ordered or unordered list exists in them then infer a concise heading from point content.
                    - If unknown, use empty string or empty array.  
                    - Extract hobby descriptions when available; if none, use empty string.
                    - Extract languages with proficiency when available.
                    - For website/linkedin/github links, return full URL with protocol (https://...).

                    Date formatting rule:
                    - Convert all month-year dates to MM YYYY format.
                    - Example: "MAY 2008" -> "05 2008", "October 2019" -> "10 2019".
                    - Keep "Present" as "Present".
                    - If month is missing and only year exists, keep as YYYY.
                    `
                },
                {
                    role: "user",
                    content: resumeText,
                },
            ],
        });

        const aiResponse = completion.choices[0].message.content;

        // parse JSON safely
        const parsed = JSON.parse(aiResponse);
        const normalized = normalizeResume(parsed);

        if (req.userDoc) {
            req.userDoc.aiUsage.resumeImports += 1;
            await req.userDoc.save();
        }

        res.json(normalized);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to parse resume" });
    }
};

