import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Container } from "react-bootstrap";
import { ReactComponent as TwitterImage } from "../assets/twitter.svg";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];
let quotesData;

export default function QuoteBox() {
  const [color, setColor] = useState(getColor());
  const [quote, setQuote] = useState({ text: "", author: "" });

  function getColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function handleColorSwitch() {
    setColor((prevColor) => {
      let newColor = prevColor;
      while (newColor === prevColor) {
        newColor = getColor();
      }
      prevColor = newColor;
      return prevColor;
    });
  }

  async function getQuotesData() {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    quotesData = await response.json();
  }

  function handleQuoteSwitch() {
    const newQuote =
      quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    setQuote({ text: newQuote.quote, author: newQuote.author });
  }

  useEffect(() => {
    getQuotesData().then(handleQuoteSwitch);
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: color,
        transition: "all 1s ease-in-out",
      }}
      fluid
    >
      <div
        style={{
          minWidth: "500px",
          maxWidth: "650px",
          color: color,
          transition: "all 1s ease-in-out",
        }}
      >
        <Card className="text-center">
          <Card.Body>
            <blockquote className="blockquote mb-5">
              <p
                style={{
                  color: color,
                  transition: "all 1s ease-in-out",
                }}
              >
                {quote.text}
              </p>
              <footer
                style={{ color: color, transition: "all 1s ease-in-out" }}
                className="blockquote-footer mt-2"
              >
                {quote.author}
              </footer>
            </blockquote>

            <ButtonGroup size="lg" style={{ minWidth: "200px" }}>
              <Button
                href={`https://twitter.com/intent/tweet?text=%22${encodeURIComponent(
                  quote.text
                )}%22%0A —${encodeURIComponent(quote.author)}`}
                variant="primary"
                style={{
                  marginRight: "1rem",
                  backgroundColor: color,
                  transition: "all 1s ease-in-out",
                  borderRadius: "5px",
                }}
              >
                <TwitterImage
                  style={{
                    maxWidth: "25px",
                    maxHeight: "25px",
                  }}
                />
              </Button>
              <Button
                variant="primary"
                style={{
                  backgroundColor: color,
                  transition: "all 1s ease-in-out",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  handleColorSwitch();
                  handleQuoteSwitch();
                }}
              >
                New Quote
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
