import { webpack } from "@webpack";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Forms, Button, Modal, TextInput } from "@components/Forms";

const OpusModule = webpack.getByProps("OpusEncoder");

export default definePlugin({
    name: "OpusChanger",
    description: "Ändere den Discord Opus mit einem übersichtlichen UI",
    authors: [Devs.YourName],
    dependencies: ["CommandsAPI"],

    commands: [{
        name: "opuschanger",
        description: "Öffne das Opus-Änderungs-UI",
        execute: () => {
            openOpusChangerModal();
        },
    }],

    start() {
        // Plugin-Start-Logik hier
    },

    stop() {
        // Plugin-Stop-Logik hier
    },
});

function openOpusChangerModal() {
    Modal.open(props => (
        <OpusChangerModal {...props} />
    ));
}

function OpusChangerModal({ transitionState, onClose }) {
    const [opusValue, setOpusValue] = React.useState(OpusModule.OpusEncoder.getOpusValue());

    const handleOpusChange = (e) => {
        setOpusValue(e.target.value);
    };

    const applyOpusChange = () => {
        try {
            OpusModule.OpusEncoder.setOpusValue(opusValue);
            onClose();
        } catch (error) {
            console.error("Fehler beim Ändern des Opus:", error);
        }
    };

    return (
        <Modal.ModalRoot transitionState={transitionState}>
            <Modal.ModalHeader>
                <Forms.FormTitle tag="h3">Opus-Änderung</Forms.FormTitle>
            </Modal.ModalHeader>
            <Modal.ModalContent>
                <Forms.FormItem title="Neuer Opus-Wert">
                    <TextInput
                        value={opusValue}
                        onChange={handleOpusChange}
                    />
                </Forms.FormItem>
            </Modal.ModalContent>
            <Modal.ModalFooter>
                <Button onClick={onClose}>Abbrechen</Button>
                <Button color={Button.Colors.GREEN} onClick={applyOpusChange}>
                    Anwenden
                </Button>
            </Modal.ModalFooter>
        </Modal.ModalRoot>
    );
}
