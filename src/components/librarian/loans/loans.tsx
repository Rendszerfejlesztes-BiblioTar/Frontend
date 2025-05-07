import {JSX} from "solid-js";
import {Card} from "solid-bootstrap";

export default (): JSX.Element => {

    return <>
        <div
            class="d-flex justify-content-center"
            style={{"max-height": '100%', "overflow-y": 'auto', padding: '2rem'}}
        >
            <Card>
                <Card.Body>
                    <Card.Title
                        style={{
                            'animation': 'fadeInDown 0.5s ease-out',
                            "font-size": "2.5rem",
                            "margin-bottom": "1.5rem",
                            "text-align": "center",
                            "font-weight": "bold",
                            "border-bottom": "2px solid #ccc",
                            "padding-bottom": "0.5rem",
                        }}
                    >
                        Loans
                    </Card.Title>
                    <Card.Text>
                        Ez a második kártya tartalma.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </>
}