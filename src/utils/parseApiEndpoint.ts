export interface EndPointParameter {
  [index: string]: string | number;
}

export const parseApiEndpoint = (endPoint: string, parameters?: EndPointParameter): string => {
  if (!parameters) {
    return endPoint;
  }

  const regex = /{(.*?)}/g;
  let newEndPoint = endPoint;
  let match: string[] | null;

  while ((match = regex.exec(endPoint))) {
    if (match === null) {
      continue;
    }

    const keyMatch: string = match?.[0];
    const parameterMatch: string = match?.[1];

    if (!keyMatch || !parameterMatch) {
      continue;
    }

    const parameter = parameters?.[parameterMatch];

    newEndPoint = newEndPoint.replace(keyMatch, parameter ? parameter.toString() : keyMatch);
  }

  return newEndPoint;
};
