"use client";

import { useState, useRef } from "react";
import { Button, Modal, TextField, Input, FieldError } from "@heroui/react";
import { Copy, ArrowUpFromSquare } from "@gravity-ui/icons";
import { decodePreset, encodePreset } from "@/lib/preset";
import {
    getSerializableSettings,
    useRenderSettings,
} from "@/lib/renderSettings";

export function PresetControls() {
    const replaceSettings = useRenderSettings((s) => s.replaceSettings);

    // Leer el preset encoded directamente desde el estado de zustand,
    // no desde la URL — así React sabe cuándo rerenderizar
    const currentPreset = useRenderSettings((s) => {
        const serializable = getSerializableSettings(s);
        return encodePreset(serializable) ?? "";
    });

    // ── Copy ─────────────────────────────────────────────────
    const [copied, setCopied] = useState(false);
    const copyTimeout = useRef(null);

    // const getCurrentPreset = () => {
    //     if (typeof window === "undefined") return "";
    //     return new URLSearchParams(window.location.search).get("preset") ?? "";
    // };

    const handleCopy = () => {
        navigator.clipboard.writeText(currentPreset).then(() => {
            setCopied(true);
            clearTimeout(copyTimeout.current);
            copyTimeout.current = setTimeout(() => setCopied(false), 2000);
        });
    };

    // ── Load modal ───────────────────────────────────────────
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // null = vacío (neutro), true = válido, false = inválido
    const [isValid, setIsValid] = useState(null);

    const openModal = () => {
        setInputValue("");
        setIsValid(null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const code = e.target.value;
        setInputValue(code);

        if (!code.trim()) {
            setIsValid(null);
            return;
        }

        setIsValid(decodePreset(code.trim()) !== null);
    };

    const handleLoad = () => {
        const code = inputValue.trim();
        const decoded = decodePreset(code);
        if (!decoded) return;

        replaceSettings(decoded);

        const url = new URL(window.location.href);
        url.searchParams.set("preset", code);
        window.history.replaceState({}, "", url.toString());

        closeModal();
    };

    const inputIsInvalid = isValid === false;
    const loadDisabled = isValid !== true;

    const buttonClasses = `flex-1 backdrop-blur-md border border-neutral-50/10 min-w-0 rounded-xl`;

    return (
        <>
            <div className="flex items-center gap-2 w-full">
                <Button
                    className={buttonClasses}
                    size="sm"
                    variant="outline"
                    startContent={<Copy />}
                    onPress={handleCopy}
                    isDisabled={!currentPreset}
                    aria-label="Copy preset"
                >
                    <span className="truncate">
                        Preset:{" "}
                        {copied ? "Copied!" : currentPreset || "Default"}
                    </span>
                </Button>

                <Button
                    className={buttonClasses}
                    size="sm"
                    variant="outline"
                    aria-label="Open preset"
                    onPress={openModal}
                >
                    <span className="truncate">
                        {/* <ArrowUpFromSquare className="w-3.5 h-3.5" /> */}
                        Open Preset
                    </span>
                </Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop className={`backdrop-blur-sm`} variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="p-0 border border-neutral-50/10 rounded-2xl">
                            <Modal.CloseTrigger />
                            <Modal.Header className="p-4 pb-0">
                                <Modal.Heading>Open Preset</Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="flex flex-col gap-2 px-4">
                                <p className="text-sm text-neutral-400">
                                    Paste a preset code to open a saved
                                    configuration.
                                </p>
                                <TextField
                                    isInvalid={inputIsInvalid}
                                    className="w-full mb-2"
                                    aria-label="Preset code"
                                >
                                    <Input
                                        className="text-sm border border-neutral-50/10 py-1.5"
                                        variant="secondary"
                                        autoFocus
                                        placeholder="Eg-- AQIhBrbUJF83MQ"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            !loadDisabled &&
                                            handleLoad()
                                        }
                                    />
                                    {/* <FieldError>
                                        Invalid code. Check that you have copied
                                        it correctly.
                                    </FieldError> */}
                                </TextField>
                            </Modal.Body>

                            <Modal.Footer className="border-t border-neutral-50/10 mt-2 py-2 px-4 bg-neutral-800/50">
                                <Button
                                    variant="outline"
                                    onPress={closeModal}
                                    className={`rounded-xl border border-neutral-50/10 hover:bg-neutral-400/5`}
                                    size="sm"
                                    aria-label="Cancel"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="tertiary"
                                    onPress={handleLoad}
                                    isDisabled={loadDisabled}
                                    className={`rounded-xl bg-neutral-200 text-neutral-900 border border-neutral-50/10`}
                                    size="sm"
                                    aria-label="Confirm load preset"
                                >
                                    Load
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}
