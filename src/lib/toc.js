// src/lib/toc.js
import GithubSlugger from "github-slugger";

const HEADING_RE = /^(#{2,3})\s+(.*)$/gm;

function stripMarkdown(text) {
    return text
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .trim();
}

export function extractHeadings(markdown) {
    const slugger = new GithubSlugger();
    const headings = [];
    let match;

    HEADING_RE.lastIndex = 0;
    while ((match = HEADING_RE.exec(markdown)) !== null) {
        const level   = match[1].length; // 2 o 3
        const rawText = stripMarkdown(match[2]);
        const id      = slugger.slug(rawText);
        headings.push({ level, text: rawText, id });
    }

    return headings;
}