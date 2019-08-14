export interface EndpointListResponse {
  endpointList: EndpointList[];
  endpointStatuses: EndpointStatuses[];
  socksProxyRunning: boolean;
  socksPort: string;
  version: string;
}


interface EndpointList {
    id: string;
    name: string;
    actualStatus: string;
    connections: number;
}

interface EndpointStatuses {
  value: string;
  display: string;
}

export interface ChangeStatusBody {
  connectionId: string;
  state: string;
}

