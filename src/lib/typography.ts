/** Insert soft wrap points after common Korean particles/conjunctions. */
export function softBreakKo(text: string): string {
  return text.replace(
    /(는|은|을|를|와|과|의|에|로|으로|부터|까지|하며|하고|거나|지만|면서|대한|위한|관한|보다|먼저)(?=\S)/g,
    "$1\u200B",
  );
}
