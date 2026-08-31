// src/components/home/InstallCommand.jsx
"use client";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Check, Copy } from "@gravity-ui/icons";
import SpecularButton from "../ui/SpecularButton";

const COMMAND = "npm i @defu13/asthree-react";

export default function InstallCommand() {
    const {copied, copy} = useCopyToClipboard();
    const handleCopy = () => copy(COMMAND);

    return (
        <SpecularButton
            onClick={handleCopy}
            className="shadow-xl cursor-pointer group flex items-center gap-3 rounded-lg border border-neutral-50/10 backdrop-blur-md px-4 py-2.5 font-mono text-sm text-neutral-300 hover:border-neutral-50/20 transition-colors w-fit"
            radius={8}
        >
            <span className="text-neutral-600">$</span>
            <span>{COMMAND}</span>
            {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
            )}
        </SpecularButton>
    );
}