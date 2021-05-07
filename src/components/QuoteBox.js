import React, { useState } from "react";
import { Button, ButtonGroup, Card, Container, Image } from "react-bootstrap";
import twitterImage from "../assets/twitter.svg";

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

export default function QuoteBox() {
  const [color, setColor] = useState(getColor());
  const [quote, setQuote] = useState(async () => {
    const quote = await getQuote();
    return setQuote({ text: quote.text, author: quote.author });
  });

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

  async function getQuote() {
    const response = await fetch(
      "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
    );
    const quote = await response.json();
    return quote.quotes[0];
  }

  async function handleQuoteSwitch() {
    const quote = await getQuote();
    setQuote({ text: quote.text, author: quote.author });
  }

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
                }}
              >
                <Image
                  src={twitterImage}
                  rounded
                  style={{ maxWidth: "25px" }}
                ></Image>
              </Button>
              <Button
                variant="primary"
                style={{
                  backgroundColor: color,
                  transition: "all 1s ease-in-out",
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
