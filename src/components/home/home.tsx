import { Card } from "solid-bootstrap";
import {
    JSX
} from "solid-js";

export default (): JSX.Element => {
    return <>
        <div
          class="d-flex justify-content-center align-items-center"
          style={{
            height: "90vh",
            padding: "2rem",
            "font-family": "'Georgia', serif",
            "overflow-y": "auto",
          }}
        >
          <Card
            class="shadow rounded border-dark"
            style={{
              width: "80vw",
              "max-width": "90vw",
              padding: "2rem",
              "background-color": "#fffaf0",
              "box-shadow": "0 4px 8px rgba(0,0,0,0.1)",
              "line-height": "1.6",
              "border-radius": "1rem",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  "font-size": "2.5rem",
                  "margin-bottom": "1.5rem",
                  "text-align": "center",
                  "font-weight": "bold",
                  "border-bottom": "2px solid #ccc",
                  "padding-bottom": "0.5rem",
                }}
              >
                Bibliótár
              </Card.Title>
              <Card.Text
                style={{
                  "font-size": "1.2rem",
                  "text-align": "justify",
                  "text-indent": "2em",
                  color: "#333",
                }}
              >
                <em>
                  Welcome to <b>Bibliótár</b>!
                  <br />
                  <br />
                  A quiet revolution in how you borrow books.
                  <br />
                  <br />
                  Bibliótár is your digital key to the shelves—reserve titles
                  online, skip the search, and simply pick up your next great read.
                  Whether you're after timeless classics, contemporary fiction, or
                  the research that sparks ideas, we've made the library experience
                  smoother, smarter, and a little more magical.
                  <br />
                  <br />
                  May you find your book in this place!
                </em>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
    </>
};

