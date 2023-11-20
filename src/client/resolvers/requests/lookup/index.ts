import net from "net";
import { LookupRequest } from "../../../../common/protocol/requests.js";
import {
  LookupResponse,
  LookupStatus,
  serializeResponse,
} from "../../../../common/protocol/response.js";
import { MessageType } from "../../../../common/protocol/types.js";

export function resolveLookupRequest(
  connection: net.Socket,
  lookupRequest: LookupRequest
) {
  const response: LookupResponse = {
    type: MessageType.LOOKUP,
    status: LookupStatus.BAD_REQUEST,
  };
  connection.write(serializeResponse(response));
}
