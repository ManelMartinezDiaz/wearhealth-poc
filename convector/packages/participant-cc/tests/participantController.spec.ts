import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Participant, ParticipantController } from '../src';

describe('Participant', () => {
  let adapter: MockControllerAdapter;
  let participantCtrl: ConvectorControllerClient<ParticipantController>;

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
       //identities: {fingerprint: 'X' , status: true}      
       //identities: [{"fingerprint": "B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:E1","status":true}]
      });
  });
});
