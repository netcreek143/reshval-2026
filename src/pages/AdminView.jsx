import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, User, Download, Camera } from 'lucide-react';

const AdminView = () => {
    const [message, setMessage] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [hasMessage, setHasMessage] = useState(false);
    const [proposalImage, setProposalImage] = useState(null);
    const [proposalTimestamp, setProposalTimestamp] = useState('');
    const [valentineImage, setValentineImage] = useState(null);
    const [valentineTimestamp, setValentineTimestamp] = useState('');

    useEffect(() => {
        const savedMessage = localStorage.getItem('userMessage');
        const savedTimestamp = localStorage.getItem('messageTimestamp');

        if (savedMessage) {
            setMessage(savedMessage);
            setHasMessage(true);
        }

        if (savedTimestamp) {
            const date = new Date(savedTimestamp);
            setTimestamp(date.toLocaleString());
        }

        // Load captured images
        const savedProposalImage = localStorage.getItem('proposalImage');
        const savedProposalTimestamp = localStorage.getItem('proposalImageTimestamp');
        const savedValentineImage = localStorage.getItem('valentineImage');
        const savedValentineTimestamp = localStorage.getItem('valentineImageTimestamp');

        if (savedProposalImage) {
            setProposalImage(savedProposalImage);
        }
        if (savedProposalTimestamp) {
            setProposalTimestamp(new Date(savedProposalTimestamp).toLocaleString());
        }
        if (savedValentineImage) {
            setValentineImage(savedValentineImage);
        }
        if (savedValentineTimestamp) {
            setValentineTimestamp(new Date(savedValentineTimestamp).toLocaleString());
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-[#e0def4] font-pixel overflow-hidden relative crt selection:bg-[#eb6f92] selection:text-[#191724] flex items-center justify-center p-4">
            {/* CRT Effects */}
            <div className="scanlines"></div>

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.3),rgba(15,23,42,0))]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(235,111,146,0.15),transparent_40%)]" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-full max-w-3xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🔐</div>
                    <h1 className="text-3xl text-[#eb6f92] mb-2 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        ADMIN PANEL
                    </h1>
                    <p className="text-xs text-[#908caa]">VIEW SUBMITTED MESSAGE</p>
                </div>

                {hasMessage ? (
                    <div className="bg-[#191724] border-4 border-[#eb6f92] p-6 md:p-8 shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
                        {/* Metadata */}
                        <div className="mb-6 flex flex-wrap gap-4 text-xs text-[#908caa] border-b-2 border-[#26233a] pb-4">
                            <div className="flex items-center gap-2">
                                <User size={14} />
                                <span>From: Reshmi</span>
                            </div>
                            {timestamp && (
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{timestamp}</span>
                                </div>
                            )}
                        </div>

                        {/* Message Content */}
                        <div className="bg-[#26233a] border-2 border-[#eb6f92] p-4 md:p-6 rounded-sm">
                            <div className="flex items-center gap-2 mb-4 text-[#eb6f92] text-xs md:text-sm">
                                <Heart size={16} />
                                <span>Her Message:</span>
                            </div>
                            <p className="text-[#e0def4] text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                                {message}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                            <div className="bg-[#26233a] border-2 border-[#6e6a86] p-3">
                                <div className="text-2xl text-[#eb6f92] mb-1">{message.length}</div>
                                <div className="text-[10px] text-[#908caa]">CHARACTERS</div>
                            </div>
                            <div className="bg-[#26233a] border-2 border-[#6e6a86] p-3">
                                <div className="text-2xl text-[#eb6f92] mb-1">{message.split(/\s+/).filter(w => w.length > 0).length}</div>
                                <div className="text-[10px] text-[#908caa]">WORDS</div>
                            </div>
                        </div>

                        {/* Captured Images Section */}
                        {(proposalImage || valentineImage) && (
                            <div className="mt-8 border-t-2 border-[#26233a] pt-6">
                                <div className="flex items-center gap-2 mb-4 text-[#eb6f92] text-sm">
                                    <Camera size={16} />
                                    <span>Captured Moments:</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Proposal Image */}
                                    {proposalImage ? (
                                        <div className="bg-[#26233a] border-2 border-[#eb6f92] p-4 rounded-sm">
                                            <div className="text-xs text-[#eb6f92] mb-2 font-bold">PROPOSAL MOMENT</div>
                                            <img src={proposalImage} alt="Proposal" className="w-full border-2 border-gray-600 mb-3" />
                                            {proposalTimestamp && (
                                                <div className="text-[10px] text-[#908caa] mb-3 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {proposalTimestamp}
                                                </div>
                                            )}
                                            <a
                                                href={proposalImage}
                                                download="proposal_moment.png"
                                                className="flex items-center justify-center gap-2 bg-[#eb6f92] text-white px-4 py-2 border-b-4 border-[#9f1239] active:border-b-0 active:translate-y-1 font-bold text-xs hover:brightness-110 w-full"
                                            >
                                                <Download size={14} /> DOWNLOAD
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="bg-[#26233a] border-2 border-[#6e6a86] p-4 rounded-sm opacity-50">
                                            <div className="text-xs text-[#6e6a86] mb-2 font-bold">PROPOSAL MOMENT</div>
                                            <div className="aspect-video bg-[#191724] border-2 border-[#6e6a86] flex items-center justify-center mb-3">
                                                <span className="text-4xl">📷</span>
                                            </div>
                                            <div className="text-[10px] text-[#6e6a86] text-center">Not captured yet</div>
                                        </div>
                                    )}

                                    {/* Valentine Image */}
                                    {valentineImage ? (
                                        <div className="bg-[#26233a] border-2 border-[#eb6f92] p-4 rounded-sm">
                                            <div className="text-xs text-[#eb6f92] mb-2 font-bold">VALENTINE'S MOMENT</div>
                                            <img src={valentineImage} alt="Valentine's Day" className="w-full border-2 border-gray-600 mb-3" />
                                            {valentineTimestamp && (
                                                <div className="text-[10px] text-[#908caa] mb-3 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {valentineTimestamp}
                                                </div>
                                            )}
                                            <a
                                                href={valentineImage}
                                                download="valentine_moment.png"
                                                className="flex items-center justify-center gap-2 bg-[#eb6f92] text-white px-4 py-2 border-b-4 border-[#9f1239] active:border-b-0 active:translate-y-1 font-bold text-xs hover:brightness-110 w-full"
                                            >
                                                <Download size={14} /> DOWNLOAD
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="bg-[#26233a] border-2 border-[#6e6a86] p-4 rounded-sm opacity-50">
                                            <div className="text-xs text-[#6e6a86] mb-2 font-bold">VALENTINE'S MOMENT</div>
                                            <div className="aspect-video bg-[#191724] border-2 border-[#6e6a86] flex items-center justify-center mb-3">
                                                <span className="text-4xl">📷</span>
                                            </div>
                                            <div className="text-[10px] text-[#6e6a86] text-center">Not captured yet</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-[#191724] border-4 border-[#6e6a86] p-8 text-center shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
                        <div className="text-6xl mb-4 opacity-50">📭</div>
                        <p className="text-[#908caa]">No message submitted yet.</p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="inline-block bg-[#26233a] border-2 border-[#eb6f92] px-6 py-2 text-xs text-[#eb6f92] hover:bg-[#eb6f92] hover:text-[#191724] transition-colors"
                    >
                        ← BACK TO HOME
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminView;
