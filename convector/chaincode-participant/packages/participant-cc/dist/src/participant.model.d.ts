import { ConvectorModel, FlatConvectorModel } from "@worldsibu/convector-core-model";
export declare class x509Identities extends ConvectorModel<x509Identities> {
    readonly type: string;
    status: boolean;
    fingerprint: string;
}
export declare class Participant extends ConvectorModel<Participant> {
    readonly type: string;
    name: string;
    msp: string;
    identities: Array<FlatConvectorModel<x509Identities>>;
}
