import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, MessageSquare, Loader2, Sparkles, Zap, Globe, Target, BarChart3 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Audio Helpers
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveConcierge = ({ t, language }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('idle'); 
  const isRTL = language === 'ar';

  const sessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const startSession = async () => {
    setStatus('connecting');
    setIsActive(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('active');
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setStatus('speaking');
              const ctx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('active');
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('active');
            }
          },
          onerror: (e) => {
            console.error('Live session error:', e);
            setStatus('error');
          },
          onclose: () => {
            setStatus('idle');
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `You are a world-class Marketing Strategy Principal at Nexoft Agency. 
          Your brand voice is authoritative, visionary, and data-driven. 
          You help global enterprise brands scale across USA, India, and GCC markets.
          Respond in ${language === 'ar' ? 'Arabic' : 'English'}. 
          Keep your answers strategic and focused on long-term brand equity.`,
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start Live session:', err);
      setStatus('error');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
    }
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
    setIsActive(false);
    setStatus('idle');
  };

  const promptSuggestions = [
    { icon: Globe, text: isRTL ? 'استراتيجية التوسع في الخليج' : 'GCC Expansion Strategy' },
    { icon: Target, text: isRTL ? 'تحسين عائد الاستثمار الإعلاني' : 'Optimizing Ad ROI' },
    { icon: BarChart3, text: isRTL ? 'رؤى حول اتجاهات المحتوى' : 'Content Trend Insights' },
    { icon: Zap, text: isRTL ? 'أتمتة عمليات التسويق' : 'Marketing Ops Automation' },
  ];

  return (
    <>
      <div className={`fixed bottom-10 ${isRTL ? 'left-10' : 'right-10'} z-[200]`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (isActive ? stopSession() : startSession())}
          className={`group relative flex items-center gap-4 px-10 py-6 rounded-sm shadow-2xl transition-all duration-500 glass-card-dark ${
            isActive ? 'bg-red-600/90 border-red-500 text-white' : 'hover:bg-blue-600/90 text-white'
          }`}
        >
          {status === 'connecting' ? (
            <Loader2 className="animate-spin" size={20} />
          ) : isActive ? (
            <MicOff size={20} />
          ) : (
            <Mic size={20} />
          )}
          <span className="text-[11px] font-black uppercase tracking-[0.25em] whitespace-nowrap">
            {isActive ? t.concierge.close : t.concierge.button}
          </span>
          
          {isActive && (
            <div className="absolute inset-0 animate-pulse bg-white/10 pointer-events-none" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className={`fixed bottom-36 ${isRTL ? 'left-10' : 'right-10'} w-full max-w-md z-[200]`}
          >
            <div className="glass-card glass-shine rounded-sm overflow-hidden border-white/40 shadow-2xl">
              <div className="p-12">
                <div className="flex items-center gap-6 mb-12">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${
                    status === 'speaking' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 ring-4 ring-blue-500/20' : 'bg-slate-950 text-white'
                  }`}>
                    {status === 'speaking' ? <Sparkles size={24} className="animate-pulse" /> : <MessageSquare size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.35em] text-slate-950 italic">{t.concierge.title}</h3>
                    <p className={`text-[10px] font-black uppercase tracking-[0.25em] mt-2 ${
                      status === 'error' ? 'text-red-500' : 'text-blue-600'
                    }`}>
                      {status === 'connecting' ? t.concierge.status : 
                       status === 'speaking' ? t.concierge.speaking : 
                       status === 'error' ? t.concierge.error : t.concierge.listening}
                    </p>
                  </div>
                </div>

                {/* Audio Visualization */}
                <div className="flex items-center justify-center h-32 mb-12 bg-white/30 backdrop-blur-md border-y border-slate-950/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  {status === 'speaking' ? (
                    <div className="flex gap-2 items-end h-16 relative z-10">
                      {[0.4, 1, 0.6, 1.2, 0.8, 1, 0.4, 0.9, 0.5, 1.1].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [`${h * 20}px`, `${h * 64}px`, `${h * 20}px`] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.05 }}
                          className="w-2.5 bg-blue-600 rounded-t-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        />
                      ))}
                    </div>
                  ) : status === 'active' ? (
                    <div className="relative">
                      <motion.div 
                        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-blue-600 blur-2xl"
                      />
                      <div className="w-16 h-16 rounded-full border-2 border-slate-950/20 flex items-center justify-center relative bg-white/50 backdrop-blur-sm">
                        <div className="w-4 h-4 bg-slate-950 rounded-sm animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <Loader2 className="animate-spin text-slate-300" size={48} />
                  )}
                </div>

                {/* Suggested Topics */}
                {!status.includes('speaking') && status !== 'connecting' && (
                   <div className="space-y-3 mb-12">
                      <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Consultation Grids</div>
                      <div className="grid grid-cols-1 gap-2">
                        {promptSuggestions.map((p, i) => (
                          <button 
                            key={i} 
                            className="flex items-center gap-3 px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/80 hover:border-blue-600/50 hover:bg-white transition-all text-[10px] font-black uppercase tracking-widest text-slate-900 group rounded-sm"
                          >
                            <p.icon size={12} className="text-blue-600 group-hover:scale-125 transition-transform" />
                            {p.text}
                          </button>
                        ))}
                      </div>
                   </div>
                )}

                <p className="text-[11px] text-center text-slate-500 font-bold leading-relaxed italic px-4 opacity-70">
                  {isRTL 
                    ? 'المساعد متاح لمناقشة خارطة طريق نمو علامتك التجارية عبر الصوت.' 
                    : 'Nexoft Strategy Intelligence is ready to audit your global growth roadmap via real-time voice.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveConcierge;