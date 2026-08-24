// app/docs/page.js — redirige /docs a la primera página
import { redirect } from "next/navigation";
import { DOCS_FLAT } from "@/lib/docsConfig";

export default function DocsIndex() {
    redirect(`/docs/${DOCS_FLAT[0].slug}`);
}