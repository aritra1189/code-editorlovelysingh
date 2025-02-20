import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import Editor from "@monaco-editor/react";
import Axios from "axios";
import spinner from "../assets/spinner.svg";

function CodeEditor() {
    const [userCode, setUserCode] = useState("");
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const options = { fontSize };

    useEffect(() => {
        const observer = new ResizeObserver(() => {});
        observer.disconnect();
        return () => observer.disconnect();
    }, []);

    const memoizedEditor = useMemo(() => (
        <Editor
            options={options}
            height="100%"
            width="100%"
            theme={userTheme}
            language={userLang}
            value={userCode}
            onChange={(value) => setUserCode(value)}
        />
    ), [options, userTheme, userLang, userCode]);

    async function compile() {
        setLoading(true);
        if (userCode.trim() === "") {
            setLoading(false);
            return;
        }

        try {
            const res = await Axios.post("https://code-editorlovelysingh.onrender.com/compile", {
                code: userCode,
                language: userLang,
                input: userInput,
            });

            setUserOutput(res.data.stdout || res.data.stderr);
        } catch (err) {
            console.error(err);
            setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
        } finally {
            setLoading(false);
        }
    }

    function clearOutput() {
        setUserOutput("");
    }

    function exportCode() {
        const blob = new Blob([userCode], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "user_code.txt";
        link.click();
    }

    function importCode(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserCode(e.target.result);
            };
            reader.readAsText(file);
        }
    }

    function shareViaEmail() {
        const subject = "Check out my code!";
        const body = encodeURIComponent(userCode);
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailtoLink;
    }

    function shareViaWhatsApp() {
        const message = encodeURIComponent(userCode);
        const whatsappLink = `https://wa.me/?text=${message}`;
        window.open(whatsappLink, "_blank");
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <div className="bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-lg">
                <h1 className="text-2xl font-bold">Code-X</h1>

                <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
                    {/* Language Selector */}
                    <div className="w-40">
                        <Select
                            className="text-black"
                            options={[
                                { value: "c", label: "C" },
                                { value: "cpp", label: "C++" },
                                { value: "python", label: "Python" },
                                { value: "java", label: "Java" },
                            ]}
                            value={{ value: userLang, label: userLang.toUpperCase() }}
                            onChange={(e) => setUserLang(e.value)}
                        />
                    </div>

                    {/* Theme Selector */}
                    <div className="w-40">
                        <Select
                            className="text-black"
                            options={[
                                { value: "vs-dark", label: "Dark" },
                                { value: "light", label: "Light" },
                            ]}
                            value={{ value: userTheme, label: userTheme }}
                            onChange={(e) => setUserTheme(e.value)}
                        />
                    </div>

                    {/* Font Size Control */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm">Font Size</label>
                        <input
                            type="range"
                            min="18"
                            max="30"
                            value={fontSize}
                            step="2"
                            onChange={(e) => setFontSize(e.target.value)}
                            className="w-24 cursor-pointer accent-blue-500"
                        />
                        <span className="text-sm font-medium">{fontSize}px</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-grow p-4 lg:p-6 gap-6 overflow-hidden">
                {/* Editor Section */}
                <div className="w-full lg:w-2/3 bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                    <div className="h-[50vh] lg:h-full overflow-auto">
                        {memoizedEditor}
                    </div>
                    <button 
                        className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300"
                        onClick={compile}
                    >
                        Run Code 🚀
                    </button>
                    
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition duration-300" onClick={exportCode}>
                            Export Code 📥
                        </button>
                        <input type="file" className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg shadow-md transition duration-300" onChange={importCode} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <button className="py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-md transition duration-300" onClick={shareViaEmail}>
                            Share via Email 📧
                        </button>
                        <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition duration-300" onClick={shareViaWhatsApp}>
                            Share via WhatsApp 📱
                        </button>
                    </div>
                </div>

                {/* Input/Output Section */}
                <div className="w-full lg:w-1/3 bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Input:</h4>
                    <textarea className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500" rows="3" onChange={(e) => setUserInput(e.target.value)} />

                    <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-300">Output:</h4>
                    <div className="bg-gray-700 p-3 rounded-lg h-32 lg:h-40 overflow-auto text-gray-200 border border-gray-600 flex-grow">
                        {loading ? <img src={spinner} alt="Loading..." className="w-12 h-12 mx-auto" /> : <pre className="whitespace-pre-wrap">{userOutput || "Output will be displayed here..."}</pre>}
                    </div>
                    <button onClick={clearOutput} className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg w-full transition duration-300">
                        Clear Output ❌
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;

