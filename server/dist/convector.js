"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = require("path");
var env_1 = require("./env");
var fs = require("fs");
var convector_adapter_fabric_1 = require("@worldsibu/convector-adapter-fabric");
var convector_core_1 = require("@worldsibu/convector-core");
var participant_cc_1 = require("participant-cc");
var person_cc_1 = require("person-cc");
var adapter = new convector_adapter_fabric_1.FabricControllerAdapter({
    txTimeout: 300000,
    user: env_1.identityName,
    channel: env_1.channel,
    chaincode: env_1.chaincode,
    keyStore: path_1.resolve(__dirname, env_1.keyStore),
    networkProfile: path_1.resolve(__dirname, env_1.networkProfile)
});
exports.initAdapter = adapter.init();
exports.ParticipantControllerBackEnd = convector_core_1.ClientFactory(participant_cc_1.ParticipantController, adapter);
exports.PersonControllerBackEnd = convector_core_1.ClientFactory(person_cc_1.PersonController, adapter);
function InitServerIdentity() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, serverIdentity;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, exports.initAdapter];
                case 1:
                    _a.sent();
                    return [4, exports.ParticipantControllerBackEnd.get(env_1.identityId)];
                case 2:
                    res = _a.sent();
                    try {
                        serverIdentity = new participant_cc_1.Participant(res).toJSON();
                        if (!serverIdentity || !serverIdentity.id) {
                            throw new Error('Server identity does not exists, make sure to enroll it or seed data');
                        }
                        else {
                            console.log('Server identity exists');
                        }
                    }
                    catch (ex) {
                        console.log(JSON.stringify(ex));
                        throw new Error('Server identity does not exists, make sure to enroll it or seed data');
                    }
                    return [2];
            }
        });
    });
}
exports.InitServerIdentity = InitServerIdentity;
var contextPath = path_1.join(env_1.keyStore + '/' + env_1.identityName);
fs.readFile(contextPath, 'utf8', function (err, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if (err) {
                throw new Error("Context in " + contextPath + " doesn't exist. Make sure that path resolves to your key stores folder");
            }
            else {
                console.log('Context path with cryptographic materials exists');
            }
            return [2];
        });
    });
});
//# sourceMappingURL=convector.js.map