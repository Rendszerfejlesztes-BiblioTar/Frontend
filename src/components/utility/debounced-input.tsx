import { Form } from "solid-bootstrap";
import { createEffect, createSignal, onCleanup } from "solid-js";

function useDebounce(signalSetter: any, delay: any) {
    let timerHandle: any
    function debouncedSignalSetter(value: any) {
        clearTimeout(timerHandle);
        timerHandle = setTimeout(() => signalSetter(value), delay);
    }
    onCleanup(() => clearTimeout(timerHandle));
    return debouncedSignalSetter;
}

function DebouncedInput(props : {placeholder : string, type: number}) {
    const [inputValue, setInputValue] = createSignal("");
    const debouncedSetInputValue = useDebounce(setInputValue, 1000);

    //TODO!!! make api call to backend
    createEffect(() => {
        const value = inputValue();
        if (value) {
            if (props.type == 0) {
                //Title search
                // console.log("Title: " + value);
            }
            if (props.type == 1) {
                //author search
                // console.log("Author: " + value);
            }
            
        }
    });

    return (
        <>
            <Form.Control 
                type="text" 
                placeholder={props.placeholder} 
                onInput={(e) => debouncedSetInputValue(e.target.value)}
            />
        </>
    );
}

export default DebouncedInput;

