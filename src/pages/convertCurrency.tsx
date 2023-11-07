import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import formatDate from "../util/formatDate";
import SymbolsSelect from "../components/symbolsSelect";
import useFetchDate from "../hooks/useFetchDate";

export default function ConvertCurrency() {
  const [query, setQuery] = useState<{
    date: string;
    to: string;
    from: string;
    amount: number;
  }>({
    date: formatDate(new Date()),
    to: "EUR",
    from: "EUR",
    amount: 1,
  });

  const { data: symbols } = useFetchDate<{
    symbols: { [key: string]: string };
  }>("/symbols");

  const { data: convertData } = useFetchDate<{
    result: number;
  }>(`/convert?to=${query.to}&from=${query.from}&amount=${query.amount}`);

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
                name="date"
                value={query.date}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="date"
                value={query.date}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    amount: parseInt(e.target.value),
                  }))
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCurrency">
              <Form.Label>From</Form.Label>
              <Form.Select
                aria-label="from"
                name="from"
                value={query.from}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, from: e.target.value }))
                }
              >
                {symbols && <SymbolsSelect symbols={symbols.symbols} />}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCurrency">
              <Form.Label>To</Form.Label>
              <Form.Select
                aria-label="to"
                name="to"
                value={query.to}
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, to: e.target.value }))
                }
              >
                {symbols && <SymbolsSelect symbols={symbols.symbols} />}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
        <p>
          Result : 1 {query.from} equals
          {convertData ? ` ${convertData.result} ${query.to}` : "--"}
        </p>
      </Container>
    </>
  );
}
