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
                        amplitudeThreshold: -100,
                        energyThreshold: -100,
                        automaticGainControl: false,
                        noiseSuppression: false,
                        echoCancellation: false,
                        volumeMultiplier: 6 // Hier können Sie den Multiplikator anpassen
                    }
                });
            }
        });
    }
});
