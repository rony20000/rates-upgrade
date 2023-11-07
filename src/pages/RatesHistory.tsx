import { useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import formatDate from "../util/formatDate";
import SymbolsSelect from "../components/symbolsSelect";
import useFetchDate from "../hooks/useFetchDate";

export default function RatesHistory() {
  const [query, setQuery] = useState<{
    startDate: string;
    endDate: string;
    base: string;
    symbol: string;
  }>({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    base: "EUR",
    symbol: "USD",
  });

  const { data: symbols } = useFetchDate<{
    symbols: { [key: string]: string };
  }>("/symbols");

  const {
    data: rates,
    isLoading,
    error,
  } = useFetchDate<{
    rates: { [key: string]: { [key: string]: number } };
  }>(
    `/timeseries?start_date=${query.startDate}&end_date=${query.endDate}&base=${query.base}&symbols=${query.symbol}`
  );

  return (
    <>
      <NavBar />
      <Container>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter start date"
                name="date"
                value={query.startDate}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter end date"
                name="date"
                value={query.endDate}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCurrency">
              <Form.Label>From</Form.Label>
              <Form.Select
                value={query.base}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, base: e.target.value }))
                }
              >
                {symbols && <SymbolsSelect symbols={symbols.symbols} />}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCurrency">
              <Form.Label>To</Form.Label>
              <Form.Select
                value={query.symbol}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, symbol: e.target.value }))
                }
              >
                {symbols && <SymbolsSelect symbols={symbols.symbols} />}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
        {error && <p>{error}</p>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date </th>
                <th>
                  1 {query.base} to {query.symbol}
                </th>
              </tr>
            </thead>

            <tbody>
              {rates?.rates &&
                Object.keys(rates.rates).map((key, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{key}</td>
                    <td>{rates.rates[key][query.symbol]}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
