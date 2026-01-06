import { useState, useEffect, useRef } from "react";

const SUPPORT_NUMBER = "+91 808 5010 847";
const LOCATION_TEXT =
    "📍 We are located at Koregaon Park, Pune.\nC-4, 2nd Floor, Hermes Vishal, Lane No.7.";

type Message = {
    from: "bot" | "user";
    text: string;
};

const botReplies = [
    {
        keywords: ["hi", "hello", "hey"],
        reply: "👋 Hi there! Welcome to BauHaus Spaces. How can we help you today?"
    },
    {
        keywords: ["location", "address", "where"],
        reply: LOCATION_TEXT
    },
    {
        keywords: ["contact", "call", "phone"],
        reply: `📞 You can call us directly at ${SUPPORT_NUMBER}`
    },
    {
        keywords: ["kitchen", "modular", "furniture", "design", "designer", "designing"],
        reply:
            "YES 😊 We specialize in Furniture Design we are here to help you with your design needs"
    },
    {
        keywords: ["interior", "home", "design"],
        reply:
            "We offer complete home interior solutions – from design to execution."
    },
    {
        keywords: ["price", "cost", "budget"],
        reply:
            `Pricing depends on scope and size. Please call us at ${SUPPORT_NUMBER} for exact details.`
    },
    {
        keywords: ["bauhaus", "details", "find"],
        reply:
            `yeah Nice to meet you Bauhaus Spaces is a modular furniture design company if you need any details for this type of questions please call us at ${SUPPORT_NUMBER}`
    },
    {
        keywords: ["Okay", "thank you", "bye", "Bye"],
        reply:
            'Thank you for your time have a great day'
    },
];

export default function ChatWidget({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            from: "bot",
            text: "👋 Hi there!\nWelcome to BauHaus Spaces.\nHow can we help you?"
        }
    ]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getBotReply = (userText: string) => {
        const lower = userText.toLowerCase();
        const match = botReplies.find(r =>
            r.keywords.some(k => lower.includes(k))
        );
        return (
            match?.reply ||
            `🙂 I’m not sure about that.\nPlease call us at ${SUPPORT_NUMBER}`
        );
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg: Message = { from: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        setTimeout(() => {
            const botMsg: Message = {
                from: "bot",
                text: getBotReply(userMsg.text)
            };
            setMessages(prev => [...prev, botMsg]);
        }, 700);
    };

    return (
        <div className="fixed bottom-20 right-6 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-[#6f6456] text-white p-4 flex justify-between items-center">
                <div>
                    <p className="font-semibold leading-none">BauHaus Spaces</p>
                    <p className="text-xs flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                        We’ll reply within a few hours
                    </p>
                </div>
                <button onClick={onClose} className="text-xl">×</button>
            </div>

            {/* Messages */}
            <div className="h-[340px] overflow-y-auto p-4 bg-[#f7f4ef] space-y-4 text-sm">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[80%] px-4 py-3 rounded-xl whitespace-pre-line ${msg.from === "bot"
                            ? "bg-[#6f6456] text-white"
                            : "bg-white ml-auto border"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2 bg-white">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Chat with designer"
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-[#6f6456] text-white px-4 py-2 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
