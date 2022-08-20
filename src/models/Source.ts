export enum Source {
  AH,
}

export function toDisplayName(source: string) {
  switch (source) {
    case "AH":
      return "www.ah.nl/allerhande";
  }
}
