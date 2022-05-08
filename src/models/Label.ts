export enum Label {
  Fast = "Snel",
  Healthy = "Gezond",
}

export function labelMapper(label: any): Label {
  if (label in Label) {
    return Label[label] as Label;
  }
  throw new Error("unexpected label");
}
