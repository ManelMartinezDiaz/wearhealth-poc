import { ConvectorController } from "@worldsibu/convector-core";
import { Participant } from "./participant.model";
export declare class ParticipantController extends ConvectorController {
    getParticipantById(id: string): Promise<Participant>;
    register(id: string, name: string): Promise<void>;
    changeIdentity(id: string, newIdentity: string): Promise<void>;
}
