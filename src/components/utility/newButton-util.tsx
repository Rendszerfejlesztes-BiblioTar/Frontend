import { useNavigate } from "@solidjs/router";
import { JSX } from "solid-js";
export default (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      class="btn btn-primary rounded-circle position-fixed d-flex align-items-center justify-content-center"
      style={{
        width: "4rem",
        height: "4rem",
        "font-size": "2rem",
        bottom: "1.5rem",
        right: "1.5rem",
        "line-height": "1",
        "z-index": "1000",
        background: '#402208',
        color: 'white',
        "border-color": '#402208'
      }}
      onClick={(): void => { navigate("/books/create") }}
    >
      +
    </button>
  );
};

