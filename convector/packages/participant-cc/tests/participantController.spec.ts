import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Participant, ParticipantController } from '../src';

describe('Participant', () => {
  let mockAdapter: MockControllerAdapter;
  let adapter: MockControllerAdapter;
  let participantCtrl: ConvectorControllerClient<ParticipantController>;

  const fakeParticipantCert =
    "-----BEGIN CERTIFICATE-----\n" +
    "MIICKDCCAc6gAwIBAgIRAKpIbs0yLYy65JIrr9irtugwCgYIKoZIzj0EAwIwcTEL\n" +
    "MAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNhbiBG\n" +
    "cmFuY2lzY28xGDAWBgNVBAoTD29yZzEuaHVybGV5LmxhYjEbMBkGA1UEAxMSY2Eu\n" +
    "b3JnMS5odXJsZXkubGFiMB4XDTE5MDUwMzEzMjQwMFoXDTI5MDQzMDEzMjQwMFow\n" +
    "azELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\n" +
    "biBGcmFuY2lzY28xDzANBgNVBAsTBmNsaWVudDEeMBwGA1UEAwwVVXNlcjFAb3Jn\n" +
    "MS5odXJsZXkubGFiMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5QS5zZd5kIlr\n" +
    "lCceMAShpkryJr3LKlev/fblhc76C6x6jfbWsYx4eilqDKGmGtoP/DL/ubiHtWxW\n" +
    "ncRs5tuu7KNNMEswDgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwKwYDVR0j\n" +
    "BCQwIoAgOrfdQBvYqeJMP2kSeYMs454SgMM0UMxVMX3smJhq1T0wCgYIKoZIzj0E\n" +
    "AwIDSAAwRQIhAKuLQTEpu7OUJVepcKR8/4agjQzP5m5dbyOhZUPi7HKzAiBromIn\n" +
    "dH9+KtMkM6VNbtSP54kS5idQg+1lXSal76P98A==\n" +
    "-----END CERTIFICATE-----\n";
  const fakeAdminCert =
    "-----BEGIN CERTIFICATE-----\n" +
    "MIIC7DCCApOgAwIBAgIUcg3DffC8hY03iz6zRC6GZQUch7EwCgYIKoZIzj0EAwIw\n" +
    "cTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\n" +
    "biBGcmFuY2lzY28xGDAWBgNVBAoTD29yZzEuaHVybGV5LmxhYjEbMBkGA1UEAxMS\n" +
    "Y2Eub3JnMS5odXJsZXkubGFiMB4XDTE5MDUwNjA4NDEwMFoXDTIwMDUwNTA4NDYw\n" +
    "MFowfzELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYD\n" +
    "VQQKEwtIeXBlcmxlZGdlcjEwMA0GA1UECxMGY2xpZW50MAsGA1UECxMEb3JnMTAS\n" +
    "BgNVBAsTC2RlcGFydG1lbnQxMQ8wDQYDVQQDEwZhZG1pbjIwWTATBgcqhkjOPQIB\n" +
    "BggqhkjOPQMBBwNCAATdhgd0fRPq4AYSvS9tiS7vcZamCG3PDAb0QM4UGyFADdWi\n" +
    "RsQjglz2/MnId4rLkU6srIAJUhDZI+QYGGkDhZlBo4H6MIH3MA4GA1UdDwEB/wQE\n" +
    "AwIHgDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBSbHq5DcRCcBt0+y4miDuzLOq80\n" +
    "8TArBgNVHSMEJDAigCD9XKUjIbuooHek1fmgbE768dWTkHdGpqGn8v/YEeBbyDAR\n" +
    "BgNVHREECjAIggZ1YnVudHUweAYIKgMEBQYHCAEEbHsiYXR0cnMiOnsiYWRtaW4i\n" +
    "OiJ0cnVlIiwiaGYuQWZmaWxpYXRpb24iOiJvcmcxLmRlcGFydG1lbnQxIiwiaGYu\n" +
    "RW5yb2xsbWVudElEIjoiYWRtaW4yIiwiaGYuVHlwZSI6ImNsaWVudCJ9fTAKBggq\n" +
    "hkjOPQQDAgNHADBEAiAzUQos0hPVPf3DuZaCW3gX+LlxL2G5d7iY1ZUh1murgwIg\n" +
    "dkQIssMaMwkireuglUubT/Chee4jFgnhJqffnG+qCHs=\n" +
    "-----END CERTIFICATE-----\n";


  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    participantCtrl = ClientFactory(ParticipantController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'ParticipantController',
        name: join(__dirname, '..')
      }
    ]);
  });

  it("should create a participant", async () => {
    // CareerAdvisorParticipant
    await participantCtrl.register("Participant1", "Participant1Name");
 const participant1 = await participantCtrl
. getParticipantById      ("Participant1")
.then      (result => { 
 return new Participant(result);
        });
     expect(participant1).to.include({
       id: "Participant1",
       name: "Participant1Name",
       msp: "dummymspId",
       identities: {fingerprint: 'X' , status: true}      
       //identities: [{"fingerprint": "B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:E1","status":true}]
      });
  });

  it("should change the active identity of a participant", async () => {
    //Create     Participant2
        await participantCtrl.register("Participant2", "Participant2Name");
    
    const participant2 = await participantCtrl
   . getParticipantById      ("Participant2")
   .then      (result => {
    return new Participant(result);
           });
        expect(participant2).to.include({
          id: "Participant2",
          name: "Participant2Name",
          x509Fingerprint:
    "01:46:C7:C0:C0:A7:11:11:54:33:7F:19:31:7B:7B:9D:66:DC:07:35:FF:28:57"
         });
         // Change identity of Participant
         // admin identity is required to change the idendity of a participant
    (mockAdapter.stub as any).usercert = fakeAdminCert;
        await participantCtrl.changeIdentity(
    "Participant2",
    "56:74:69:D7:D7:C5:A4:A4:C5:2D:4B:7B:7B:27:A9:6A:A8:6A:C9:26:FF:8B:82"
         );

         const participant2Updated = await participantCtrl
         . getParticipantById      ("Participant2")
         .then      (result => {
          return new Participant(result);
                 });
              expect(participant2Updated).to.include({
                id: "Participant2",
                name: "Participant2Name"
              //  x509Fingerprint: "56:74:69:D7:D7:C5:A4:A4:C5:2D:4B:7B:7B:27:A9:6A:A8:6A:C9:26:FF:8B:82" 
              });
           });
          });