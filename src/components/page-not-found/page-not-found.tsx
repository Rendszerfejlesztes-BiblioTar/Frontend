import {
    JSX
} from 'solid-js';

import { Card } from 'solid-bootstrap';

export default (): JSX.Element => {

    return <>
        <div
            class={`d-flex justify-content-center align-items-center`}
            style={{
                height: '40vh',
                padding: '2rem',
                'font-family': "Georgia', serif",
                'overflow-y': 'auto',
            }}
        >
            <Card
                class='shadow rounded border-dark'
                style={{
                    width: '30vw',
                    'max-width': '90vw',
                    padding: '2rem',
                    'background-color': '#fffaf0',
                    'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
                    'line-height': '1.6',
                    'border-radius': '1rem',
                    'overflow': 'hidden'
                }}
            >
                <Card.Body>
                    <Card.Title
                        style={{
                            'animation': 'lightSpeedInRight 2s ease-out',
                            'font-size': '2.5rem',
                            'margin-bottom': '1.5rem',
                            'text-align': 'center',
                            'font-weight': 'bold',
                            'border-bottom': '2px solid #ccc',
                            'padding-bottom': '0.5rem',
                        }}
                    >
                        404 Page not found!
                    </Card.Title>
                    <Card.Text
                        style={{
                            'font-size': '1.2rem',
                            'text-align': 'justify',
                            'text-indent': '2em',
                            'color': '#333',
                        }}
                    >
                        <h4 style={{'text-align': 'center'}}>The requested page doesn't exist.</h4>
                        <p>

                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </>
}