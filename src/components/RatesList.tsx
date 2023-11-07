export default function RatesList({
  rates,
}: {
  rates: { [key: string]: number };
}) {
  const ratesList = Object.keys(rates).map((key, i) => (
    <tr key={key}>
      <td>{i + 1}</td>
      <td>{key}</td>
      <td>{rates[key]}</td>
    </tr>
  ));
  return <tbody>{ratesList}</tbody>;
}
