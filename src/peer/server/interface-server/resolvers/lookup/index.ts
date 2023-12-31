import { LookupRequest, serializeRequest } from '../../../../../common/protocol/requests.js';
import { deserializeResponse, serializeResponse } from '../../../../../common/protocol/response.js';
import { extractLookupResponse } from '../../../../../common/protocol/validators/response.js';
import http from 'http';
import { masterConnection } from '../../../../masterConnection.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function resolveLookupRequest(interfaceConnection: http.ServerResponse, request: LookupRequest) {
  masterConnection.write(serializeRequest(request));

  const listener = (message: string) => deserializeResponse(message)
    .chain(extractLookupResponse)
    .map(serializeResponse)
    .map((mes) => interfaceConnection.write(mes))
    .map(() => interfaceConnection.end())
    .map(() => masterConnection.removeListener('message', listener));
  masterConnection.on('message', listener);
}
