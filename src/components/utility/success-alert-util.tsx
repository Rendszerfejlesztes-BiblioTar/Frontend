import { createSignal, onCleanup, createEffect } from "solid-js";

function SuccessAlert(props: { trigger: boolean }) {
    const [visible, setVisible] = createSignal(false);

    createEffect(() => {
        if (props.trigger) {
            setVisible(true);
            const timeout = setTimeout(() => setVisible(false), 5000);
            onCleanup(() => clearTimeout(timeout));
        }
    });

    return (
        <>
            {visible() && (
                <div class="alert alert-success" style={{
                    background: "#d4edda",
                    color: "#155724",
                    padding: "1rem",
                    "border-radius": "0.25rem",
                    border: "1px solid #c3e6cb",
                    "margin-top": "1rem"
                }}>
                    Password change successful!
                </div>
            )}
        </>
    );
}

export default SuccessAlert;
