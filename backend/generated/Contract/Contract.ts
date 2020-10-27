// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class EventToken extends ethereum.Event {
  get params(): EventToken__Params {
    return new EventToken__Params(this);
  }
}

export class EventToken__Params {
  _event: EventToken;

  constructor(event: EventToken) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AdminAdded extends ethereum.Event {
  get params(): AdminAdded__Params {
    return new AdminAdded__Params(this);
  }
}

export class AdminAdded__Params {
  _event: AdminAdded;

  constructor(event: AdminAdded) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AdminRemoved extends ethereum.Event {
  get params(): AdminRemoved__Params {
    return new AdminRemoved__Params(this);
  }
}

export class AdminRemoved__Params {
  _event: AdminRemoved;

  constructor(event: AdminRemoved) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class EventMinterAdded extends ethereum.Event {
  get params(): EventMinterAdded__Params {
    return new EventMinterAdded__Params(this);
  }
}

export class EventMinterAdded__Params {
  _event: EventMinterAdded;

  constructor(event: EventMinterAdded) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class EventMinterRemoved extends ethereum.Event {
  get params(): EventMinterRemoved__Params {
    return new EventMinterRemoved__Params(this);
  }
}

export class EventMinterRemoved__Params {
  _event: EventMinterRemoved;

  constructor(event: EventMinterRemoved) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class Contract__tokenDetailsOfOwnerByIndexResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isAdmin(account: Address): boolean {
    let result = super.call("isAdmin", "isAdmin(address):(bool)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_isAdmin(account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isAdmin", "isAdmin(address):(bool)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isEventMinter(eventId: BigInt, account: Address): boolean {
    let result = super.call(
      "isEventMinter",
      "isEventMinter(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(eventId),
        ethereum.Value.fromAddress(account)
      ]
    );

    return result[0].toBoolean();
  }

  try_isEventMinter(
    eventId: BigInt,
    account: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isEventMinter",
      "isEventMinter(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(eventId),
        ethereum.Value.fromAddress(account)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastId(): BigInt {
    let result = super.call("lastId", "lastId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lastId", "lastId():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenEvent(tokenId: BigInt): BigInt {
    let result = super.call("tokenEvent", "tokenEvent(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toBigInt();
  }

  try_tokenEvent(tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("tokenEvent", "tokenEvent(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenDetailsOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): Contract__tokenDetailsOfOwnerByIndexResult {
    let result = super.call(
      "tokenDetailsOfOwnerByIndex",
      "tokenDetailsOfOwnerByIndex(address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return new Contract__tokenDetailsOfOwnerByIndexResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_tokenDetailsOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<Contract__tokenDetailsOfOwnerByIndexResult> {
    let result = super.tryCall(
      "tokenDetailsOfOwnerByIndex",
      "tokenDetailsOfOwnerByIndex(address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__tokenDetailsOfOwnerByIndexResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  mintToken(eventId: BigInt, to: Address): boolean {
    let result = super.call("mintToken", "mintToken(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(eventId),
      ethereum.Value.fromAddress(to)
    ]);

    return result[0].toBoolean();
  }

  try_mintToken(eventId: BigInt, to: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "mintToken",
      "mintToken(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(eventId),
        ethereum.Value.fromAddress(to)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mintEventToManyUsers(eventId: BigInt, to: Array<Address>): boolean {
    let result = super.call(
      "mintEventToManyUsers",
      "mintEventToManyUsers(uint256,address[]):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(eventId),
        ethereum.Value.fromAddressArray(to)
      ]
    );

    return result[0].toBoolean();
  }

  try_mintEventToManyUsers(
    eventId: BigInt,
    to: Array<Address>
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "mintEventToManyUsers",
      "mintEventToManyUsers(uint256,address[]):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(eventId),
        ethereum.Value.fromAddressArray(to)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mintUserToManyEvents(eventIds: Array<BigInt>, to: Address): boolean {
    let result = super.call(
      "mintUserToManyEvents",
      "mintUserToManyEvents(uint256[],address):(bool)",
      [
        ethereum.Value.fromUnsignedBigIntArray(eventIds),
        ethereum.Value.fromAddress(to)
      ]
    );

    return result[0].toBoolean();
  }

  try_mintUserToManyEvents(
    eventIds: Array<BigInt>,
    to: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "mintUserToManyEvents",
      "mintUserToManyEvents(uint256[],address):(bool)",
      [
        ethereum.Value.fromUnsignedBigIntArray(eventIds),
        ethereum.Value.fromAddress(to)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class RenounceEventMinterCall extends ethereum.Call {
  get inputs(): RenounceEventMinterCall__Inputs {
    return new RenounceEventMinterCall__Inputs(this);
  }

  get outputs(): RenounceEventMinterCall__Outputs {
    return new RenounceEventMinterCall__Outputs(this);
  }
}

export class RenounceEventMinterCall__Inputs {
  _call: RenounceEventMinterCall;

  constructor(call: RenounceEventMinterCall) {
    this._call = call;
  }

  get eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RenounceEventMinterCall__Outputs {
  _call: RenounceEventMinterCall;

  constructor(call: RenounceEventMinterCall) {
    this._call = call;
  }
}

export class RemoveEventMinterCall extends ethereum.Call {
  get inputs(): RemoveEventMinterCall__Inputs {
    return new RemoveEventMinterCall__Inputs(this);
  }

  get outputs(): RemoveEventMinterCall__Outputs {
    return new RemoveEventMinterCall__Outputs(this);
  }
}

export class RemoveEventMinterCall__Inputs {
  _call: RemoveEventMinterCall;

  constructor(call: RemoveEventMinterCall) {
    this._call = call;
  }

  get eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RemoveEventMinterCall__Outputs {
  _call: RemoveEventMinterCall;

  constructor(call: RemoveEventMinterCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class AddAdminCall extends ethereum.Call {
  get inputs(): AddAdminCall__Inputs {
    return new AddAdminCall__Inputs(this);
  }

  get outputs(): AddAdminCall__Outputs {
    return new AddAdminCall__Outputs(this);
  }
}

export class AddAdminCall__Inputs {
  _call: AddAdminCall;

  constructor(call: AddAdminCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAdminCall__Outputs {
  _call: AddAdminCall;

  constructor(call: AddAdminCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RenounceAdminCall extends ethereum.Call {
  get inputs(): RenounceAdminCall__Inputs {
    return new RenounceAdminCall__Inputs(this);
  }

  get outputs(): RenounceAdminCall__Outputs {
    return new RenounceAdminCall__Outputs(this);
  }
}

export class RenounceAdminCall__Inputs {
  _call: RenounceAdminCall;

  constructor(call: RenounceAdminCall) {
    this._call = call;
  }
}

export class RenounceAdminCall__Outputs {
  _call: RenounceAdminCall;

  constructor(call: RenounceAdminCall) {
    this._call = call;
  }
}

export class AddEventMinterCall extends ethereum.Call {
  get inputs(): AddEventMinterCall__Inputs {
    return new AddEventMinterCall__Inputs(this);
  }

  get outputs(): AddEventMinterCall__Outputs {
    return new AddEventMinterCall__Outputs(this);
  }
}

export class AddEventMinterCall__Inputs {
  _call: AddEventMinterCall;

  constructor(call: AddEventMinterCall) {
    this._call = call;
  }

  get eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class AddEventMinterCall__Outputs {
  _call: AddEventMinterCall;

  constructor(call: AddEventMinterCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetBaseURICall extends ethereum.Call {
  get inputs(): SetBaseURICall__Inputs {
    return new SetBaseURICall__Inputs(this);
  }

  get outputs(): SetBaseURICall__Outputs {
    return new SetBaseURICall__Outputs(this);
  }
}

export class SetBaseURICall__Inputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }

  get baseURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetBaseURICall__Outputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }
}

export class SetLastIdCall extends ethereum.Call {
  get inputs(): SetLastIdCall__Inputs {
    return new SetLastIdCall__Inputs(this);
  }

  get outputs(): SetLastIdCall__Outputs {
    return new SetLastIdCall__Outputs(this);
  }
}

export class SetLastIdCall__Inputs {
  _call: SetLastIdCall;

  constructor(call: SetLastIdCall) {
    this._call = call;
  }

  get newLastId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetLastIdCall__Outputs {
  _call: SetLastIdCall;

  constructor(call: SetLastIdCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class MintTokenCall extends ethereum.Call {
  get inputs(): MintTokenCall__Inputs {
    return new MintTokenCall__Inputs(this);
  }

  get outputs(): MintTokenCall__Outputs {
    return new MintTokenCall__Outputs(this);
  }
}

export class MintTokenCall__Inputs {
  _call: MintTokenCall;

  constructor(call: MintTokenCall) {
    this._call = call;
  }

  get eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class MintTokenCall__Outputs {
  _call: MintTokenCall;

  constructor(call: MintTokenCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class MintEventToManyUsersCall extends ethereum.Call {
  get inputs(): MintEventToManyUsersCall__Inputs {
    return new MintEventToManyUsersCall__Inputs(this);
  }

  get outputs(): MintEventToManyUsersCall__Outputs {
    return new MintEventToManyUsersCall__Outputs(this);
  }
}

export class MintEventToManyUsersCall__Inputs {
  _call: MintEventToManyUsersCall;

  constructor(call: MintEventToManyUsersCall) {
    this._call = call;
  }

  get eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get to(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class MintEventToManyUsersCall__Outputs {
  _call: MintEventToManyUsersCall;

  constructor(call: MintEventToManyUsersCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class MintUserToManyEventsCall extends ethereum.Call {
  get inputs(): MintUserToManyEventsCall__Inputs {
    return new MintUserToManyEventsCall__Inputs(this);
  }

  get outputs(): MintUserToManyEventsCall__Outputs {
    return new MintUserToManyEventsCall__Outputs(this);
  }
}

export class MintUserToManyEventsCall__Inputs {
  _call: MintUserToManyEventsCall;

  constructor(call: MintUserToManyEventsCall) {
    this._call = call;
  }

  get eventIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class MintUserToManyEventsCall__Outputs {
  _call: MintUserToManyEventsCall;

  constructor(call: MintUserToManyEventsCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class BurnCall extends ethereum.Call {
  get inputs(): BurnCall__Inputs {
    return new BurnCall__Inputs(this);
  }

  get outputs(): BurnCall__Outputs {
    return new BurnCall__Outputs(this);
  }
}

export class BurnCall__Inputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class BurnCall__Outputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class Initialize1Call extends ethereum.Call {
  get inputs(): Initialize1Call__Inputs {
    return new Initialize1Call__Inputs(this);
  }

  get outputs(): Initialize1Call__Outputs {
    return new Initialize1Call__Outputs(this);
  }
}

export class Initialize1Call__Inputs {
  _call: Initialize1Call;

  constructor(call: Initialize1Call) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class Initialize1Call__Outputs {
  _call: Initialize1Call;

  constructor(call: Initialize1Call) {
    this._call = call;
  }
}

export class Initialize2Call extends ethereum.Call {
  get inputs(): Initialize2Call__Inputs {
    return new Initialize2Call__Inputs(this);
  }

  get outputs(): Initialize2Call__Outputs {
    return new Initialize2Call__Outputs(this);
  }
}

export class Initialize2Call__Inputs {
  _call: Initialize2Call;

  constructor(call: Initialize2Call) {
    this._call = call;
  }

  get __name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get __symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get __baseURI(): string {
    return this._call.inputValues[2].value.toString();
  }

  get admins(): Array<Address> {
    return this._call.inputValues[3].value.toAddressArray();
  }
}

export class Initialize2Call__Outputs {
  _call: Initialize2Call;

  constructor(call: Initialize2Call) {
    this._call = call;
  }
}
