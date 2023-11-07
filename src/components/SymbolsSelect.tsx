export default function SymbolsSelect({
  symbols,
}: {
  symbols: { [key: string]: string };
}) {
  const symbolsList = Object.keys(symbols).map((key) => (
    <option key={key} value={key}>
      {key}
    </option>
  ));
  return <>{symbolsList}</>;
}
