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
exports.__esModule = true;
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var x509Identities = /** @class */ (function (_super) {
    __extends(x509Identities, _super);
    function x509Identities() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.examples.x509identity';
        return _this;
    }
    __decorate([
        convector_core_model_1.ReadOnly()
    ], x509Identities.prototype, "type");
    __decorate([
        convector_core_model_1.Validate(yup.boolean()),
        convector_core_model_1.Required()
    ], x509Identities.prototype, "status");
    __decorate([
        convector_core_model_1.Validate(yup.string()),
        convector_core_model_1.Required()
    ], x509Identities.prototype, "fingerprint");
    return x509Identities;
}(convector_core_model_1.ConvectorModel));
exports.x509Identities = x509Identities;
var Participant = /** @class */ (function (_super) {
    __extends(Participant, _super);
    function Participant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "io.worldsibu.participant";
        return _this;
    }
    __decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Participant.prototype, "type");
    __decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Participant.prototype, "name");
    __decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Validate(yup.string())
    ], Participant.prototype, "msp");
    __decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.array(x509Identities.schema()))
    ], Participant.prototype, "identities");
    return Participant;
}(convector_core_model_1.ConvectorModel));
exports.Participant = Participant;
