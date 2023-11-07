import { Col, Container, Form, Row, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useState } from "react";
import formatDate from "../util/formatDate";
import SymbolsSelect from "../components/symbolsSelect";
import useFetchDate from "../hooks/useFetchDate";
import RatesList from "../components/RatesList";
export default function RateList() {
  const [query, setQuery] = useState<{ date: string; currency: string }>({
    date: formatDate(new Date()),
    currency: "EUR",
  });

  const { data: symbols } = useFetchDate<{
    symbols: { [key: string]: string };
  }>("/symbols");

  const {
    data: rates,
    isLoading,
    error,
  } = useFetchDate<{
    rates: { [key: string]: number };
  }>(`/${query.date}?base=${query.currency}`);

  return (
    <>
      <NavBar />
      <Container>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={query.date}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Select
                aria-label="EUR"
                value={query.currency}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, currency: e.target.value }))
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
                <th>Currency</th>
                <th>Exchange Rate = 1 {query.currency} </th>
              </tr>
            </thead>

            {rates?.rates && <RatesList rates={rates.rates} />}
          </Table>
        )}
      </Container>
    </>
  );
}
