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
"#73A857"];


const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getQuote = async () => {
  const response = await fetch("https://api.quotable.io/random");
  const quote = await response.json();
  return quote;
};

const switchColor = () => {
  let color = getColor();
  $("#new-quote").animate({ backgroundColor: color }, 1000);
  $("#tweet-quote").animate({ backgroundColor: color }, 1000);
  $("body").animate({ backgroundColor: color, color: color }, 1000);
  $("#quote").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
  });
};

const switchQuote = async () => {
  const quote = await getQuote();
  document.getElementById("text").innerHTML = quote.content;
  document.getElementById("author").innerHTML = "&mdash; " + quote.author;
  $("#tweet-quote").attr(
  "href",
  "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote.content));

};

const newQuote = async () => {
  await switchQuote();
  switchColor();
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    newQuote();
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
      React.createElement("figure", { id: "quote", class: "quote" }, /*#__PURE__*/
      React.createElement("blockquote", { id: "text" }), /*#__PURE__*/
      React.createElement("figcaption", { id: "author" })), /*#__PURE__*/

      React.createElement("a", { id: "tweet-quote", target: "_top", title: "Tweet this quote" }, /*#__PURE__*/
      React.createElement("i", { class: "fab fa-twitter" })), /*#__PURE__*/

      React.createElement("button", { id: "new-quote", type: "button", onClick: newQuote }, "New quote")));




  }}

ReactDOM.render( /*#__PURE__*/React.createElement(Presentational, null), document.getElementById("root"));