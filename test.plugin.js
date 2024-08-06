import { definePlugin } from "@utils/types";

export default definePlugin({
    name: "VoiceLoudness",
    description: "Erhöht die maximale Lautstärke im Voice-Chat",
    authors: [{ name: "YourName", id: 123456789n }],
    
    start() {
        this.patchVoiceEngine();
    },

    stop() {
        // Cleanup-Code hier, falls nötig
    },

    patchVoiceEngine() {
        const VoiceEngine = BdApi.Webpack.getModule(m => m.prototype?.destroy && m.prototype.initialize);
        BdApi.Patcher.after("VoiceLoudness", VoiceEngine.prototype, "initialize", (that) => {
            if (that.voiceConnection) {
                that.voiceConnection.setTransportOptions({
                    input: {
                        amplitudeThreshold: -200,
                        energyThreshold: -200,
                        automaticGainControl: false,
                        noiseSuppression: false,
                        echoCancellation: false,
                        volumeMultiplier: 4 // Hier können Sie den Multiplikator anpassen
                    }
                });
            }
        });
    }
});
        // Patch für Stereo-Encoding
        const MediaEngineStore = BdApi.Webpack.getModule(m => m.default && m.default.getMediaEngine);
        BdApi.Patcher.after("VoiceLoudnessAndStereo", MediaEngineStore.default, "getMediaEngine", (_, __, result) => {
            if (result && result.encode) {
                const originalEncode = result.encode;
                result.encode = function(buffer, channels, sampleRate) {
                    return originalEncode.call(this, buffer, 2, sampleRate); // Erzwinge 2 Kanäle für Stereo
                };
            }
            return result;
        });
    }
});
