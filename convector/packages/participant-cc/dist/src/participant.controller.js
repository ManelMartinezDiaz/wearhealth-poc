"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_1 = require("@worldsibu/convector-core");
var participant_model_1 = require("./participant.model");
var ParticipantController = (function (_super) {
    tslib_1.__extends(ParticipantController, _super);
    function ParticipantController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParticipantController.prototype.getParticipantById = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var participant;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, participant_model_1.Participant.getOne(id)];
                    case 1:
                        participant = _a.sent();
                        if (!participant || !participant.id) {
                            return [2, null];
                        }
                        return [2, participant];
                }
            });
        });
    };
    ParticipantController.prototype.register = function (id, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var existing, participant;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, participant_model_1.Participant.getOne(id)];
                    case 1:
                        existing = _a.sent();
                        if (!(!existing || !existing.id)) return [3, 3];
                        participant = new participant_model_1.Participant();
                        participant.id = id;
                        participant.name = name;
                        participant.msp = this.tx.identity.getMSPID();
                        participant.x509Fingerprint = this.sender;
                        return [4, participant.save()];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3: throw new Error("a participant already exists with the id \"" + id + "\"");
                    case 4: return [2];
                }
            });
        });
    };
    ParticipantController.prototype.changeIdentity = function (id, newIdentity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isAdmin, requesterMSP, existing;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isAdmin = this.tx.identity.getAttributeValue("admin");
                        requesterMSP = this.tx.identity.getMSPID();
                        return [4, participant_model_1.Participant.getOne(id)];
                    case 1:
                        existing = _a.sent();
                        if (!existing || !existing.id) {
                            throw new Error("No identity exists with the id \"" + id + "\"");
                        }
                        if (existing.msp != requesterMSP) {
                            throw new Error("Unauthorized. The caller msp \"" + requesterMSP + "\" is different from the par-ticipant msp \"" + existing.msp + "\"");
                        }
                        if (!isAdmin) {
                            throw new Error("Unauthorized. Requester identity is not an admin");
                        }
                        existing.x509Fingerprint = newIdentity;
                        return [4, existing.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "getParticipantById", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "register", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "changeIdentity", null);
    ParticipantController = tslib_1.__decorate([
        convector_core_1.Controller("participant")
    ], ParticipantController);
    return ParticipantController;
}(convector_core_1.ConvectorController));
exports.ParticipantController = ParticipantController;
//# sourceMappingURL=participant.controller.js.map