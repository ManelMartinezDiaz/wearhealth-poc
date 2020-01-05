"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var yup = require("yup");
var convector_core_1 = require("@worldsibu/convector-core");
var participant_model_1 = require("./participant.model");
var ParticipantController = /** @class */ (function (_super) {
    __extends(ParticipantController, _super);
    function ParticipantController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParticipantController.prototype.register = function (id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, participant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, participant_model_1.Participant.getOne(id)];
                    case 1:
                        existing = _a.sent();
                        if (!(!existing || !existing.id)) return [3 /*break*/, 3];
                        participant = new participant_model_1.Participant();
                        participant.id = id;
                        participant.name = name || id;
                        participant.msp = this.tx.identity.getMSPID();
                        // Create a new identity
                        participant.identities = [{
                                fingerprint: this.sender,
                                status: true
                            }];
                        console.log(JSON.stringify(participant));
                        return [4 /*yield*/, participant.save()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error('Identity exists already, please call changeIdentity fn for updates');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ParticipantController.prototype.getParticipantById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var participant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, participant_model_1.Participant.getOne(id)];
                    case 1:
                        participant = _a.sent();
                        // a non-null or defined result doesn't mean that it is valid, the following check must still be done
                        if (!participant || !participant.id) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, participant];
                }
            });
        });
    };
    ParticipantController.prototype.changeIdentity = function (id, newIdentity) {
        return __awaiter(this, void 0, void 0, function () {
            var isAdmin, requesterMSP, existing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isAdmin = this.tx.identity.getAttributeValue('admin');
                        console.log(this.tx.identity);
                        console.log(isAdmin);
                        requesterMSP = this.tx.identity.getMSPID();
                        return [4 /*yield*/, participant_model_1.Participant.getOne(id)];
                    case 1:
                        existing = _a.sent();
                        console.log('Existing participant:');
                        console.log(existing);
                        if (!existing || !existing.id) {
                            throw new Error('No identity exists with that ID');
                        }
                        console.log("existing.msp=" + existing.msp + " requesterMSP=" + requesterMSP);
                        if (existing.msp != requesterMSP) {
                            throw new Error('Unathorized. MSPs do not match');
                        }
                        console.log("isAdmin=" + isAdmin);
                        if (!isAdmin) {
                            throw new Error('Unathorized. Requester identity is not an admin');
                        }
                        // Disable previous identities!
                        existing.identities = existing.identities.map(function (identity) {
                            identity.status = false;
                            return identity;
                        });
                        // Set the enrolling identity 
                        existing.identities.push({
                            fingerprint: newIdentity,
                            status: true
                        });
                        return [4 /*yield*/, existing.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ParticipantController.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var existing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, participant_model_1.Participant.getOne(id)];
                    case 1:
                        existing = _a.sent();
                        if (!existing || !existing.id) {
                            throw new Error("No identity exists with that ID " + id);
                        }
                        return [2 /*return*/, existing];
                }
            });
        });
    };
    __decorate([
        convector_core_1.Invokable(),
        __param(0, convector_core_1.Param(yup.string())),
        __param(1, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "register");
    __decorate([
        convector_core_1.Invokable(),
        __param(0, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "getParticipantById");
    __decorate([
        convector_core_1.Invokable(),
        __param(0, convector_core_1.Param(yup.string())),
        __param(1, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "changeIdentity");
    __decorate([
        convector_core_1.Invokable(),
        __param(0, convector_core_1.Param(yup.string()))
    ], ParticipantController.prototype, "get");
    ParticipantController = __decorate([
        convector_core_1.Controller('participant')
    ], ParticipantController);
    return ParticipantController;
}(convector_core_1.ConvectorController));
exports.ParticipantController = ParticipantController;
