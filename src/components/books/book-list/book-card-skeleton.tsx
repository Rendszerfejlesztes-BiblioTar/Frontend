import {
    JSX
} from "solid-js";

import { Button, Card } from "solid-bootstrap";

export default (): JSX.Element => {
    return <>
        <div class="col-2 d-flex justify-content-center mb-4">
            <Card
                style={{
                    animation: 'flash 3s infinite linear',
                    width: '15rem',
                    height: '100%',
                    cursor: 'default',
                }}
                class="d-flex flex-column shadow rounded skeleton-blink">
                <Card.Body class={`d-flex flex-column`}>
                    <Card.Title style={{"font-size": "1.5rem", "font-weight": 'bold', 'height': '1rem'}}>&nbsp;</Card.Title>

                    <Card.Subtitle class="mb-2" style={{"font-size": "1.15rem", 'height': '1rem'}}></Card.Subtitle>
                    <Card.Subtitle class="mb-2 text-muted" style={{"font-size": "1rem", 'height': '3rem'}}></Card.Subtitle>

                    <hr class="my-2"/>
                    <Card.Text class="flex-grow-1" style={{"font-size": "1.2rem", 'height': '8rem'}}></Card.Text>

                    <div class="mt-auto">
                        <Button disabled={true} variant="info" style={{
                            background: '#402208',
                            color: 'white',
                            "border-color": '#402208'
                        }}><div style={{ width: '4rem', height: '1rem'}}></div></Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </>
}