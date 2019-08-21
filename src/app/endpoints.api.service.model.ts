export interface EndpointListResponse {
  endpointList: EndpointList[];
  endpointStatuses: EndpointStatuses[];
}


export interface StatusResponse {
  socksProxyRunning: boolean;
  socksPort: number;
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

export interface ConnectonGraphResponse {
  items: GraphItem[];
}

interface GraphItem {
  time: number;
  grouped: [
    {
      status: string;
      count: number;
    }
  ];
}
