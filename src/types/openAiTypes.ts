interface IGPT3Choice {
  text: string;
  index: number;
  logprobs: any;
  finish_reason: string;
}

export interface IGPT3Response {
  status: number;
  statusText: string;
  headers: Object;
  config: Object;
  request: any;
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: IGPT3Choice[];
    usage: Object;
  };
}
