import { ConvectorModel } from "@worldsibu/convector-core-model";
export declare class Participant extends ConvectorModel<Participant> {
    readonly type: string;
    name: string;
    msp: string;
    x509Fingerprint: any;
}
