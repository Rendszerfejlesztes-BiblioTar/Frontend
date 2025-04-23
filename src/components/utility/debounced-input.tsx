import { Form } from "solid-bootstrap";
import { createEffect, createSignal, onCleanup, useContext } from "solid-js";
import { BookGetDTO } from "../../interfaces/book.interfaces";
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";

function useDebounce(signalSetter: any, delay: any) {
    let timerHandle: any
    function debouncedSignalSetter(value: any) {
        clearTimeout(timerHandle);
        timerHandle = setTimeout(() => signalSetter(value), delay);
    }
    onCleanup(() => clearTimeout(timerHandle));
    return debouncedSignalSetter;
}

function DebouncedInput(props : {placeholder : string, type: number, setBooksSIG: (books: BookGetDTO[]) => void }) {
    const [inputValue, setInputValue] = createSignal("");
    const debouncedSetInputValue = useDebounce(setInputValue, 1000);

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    createEffect(() => {
        const value = inputValue();

        if (value === "") {
            app.bookService.getBooks().then((res: BookGetDTO[] | undefined): void => {
                if (res) {
                    props.setBooksSIG(res);
                }
            });
            return;
        }

        if (value) {
            if (props.type == 0) {
                //Title search
                app.bookService.getBooksByTitle(value).then((res: BookGetDTO[] | undefined): void => {
                    if (res) {
                        props.setBooksSIG(res);
                    }
                    else {
                        props.setBooksSIG([]);
                    }
                });
            }
            if (props.type == 1) {
                //author search
                app.bookService.getBooksByAuthor(value).then((res: BookGetDTO[] | undefined): void => {
                    if (res) {
                        props.setBooksSIG(res);
                    }
                    else {
                        props.setBooksSIG([]);
                    }
                });
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

