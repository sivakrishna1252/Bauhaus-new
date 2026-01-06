import { useState } from "react";
import ChatWidget from "./ChatWidget";

export default function FloatingChat() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-[#6f6456] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:opacity-90"
            >
                💬 Let’s Chat
            </button>

            {open && <ChatWidget onClose={() => setOpen(false)} />}
        </>
    );
}
