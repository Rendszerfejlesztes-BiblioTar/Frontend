import { Form } from "solid-bootstrap";
import {
    createEffect,
    createSignal,
    JSX,
    onCleanup,
    Setter,
    useContext
} from "solid-js";

import { DIContextProvider } from "../../services/di-context-provider.service";
import { AppService } from "../../services/app.service";

import { BookGetDTO } from "../../interfaces/book.interfaces";

export default (props : {placeholder : string, type: number, setBooksSIG: (books: BookGetDTO[]) => void }): JSX.Element => {
    const [inputValue, setInputValue] = createSignal("");

    const useDebounce = (signalSetter: Setter<string>, delay: number) => {
        let timerHandle: NodeJS.Timeout | null = null;

        const debouncedSignalSetter = (value: string): void => {
            if (timerHandle) {
                clearTimeout(timerHandle);
            }
            timerHandle = setTimeout((): string => signalSetter(value), delay);
        }

        onCleanup((): void => {
            if (timerHandle) {
                clearTimeout(timerHandle)
            }
        });

        return debouncedSignalSetter;
    }

    const debouncedSetInputValue = useDebounce(setInputValue, 1000);

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    createEffect((): void => {
        const value: string = inputValue();

        if (value === "") {
            app.bookService.getBooks().then((res: BookGetDTO[] | undefined): void => {
                if (res) {
                    props.setBooksSIG(res);
                }
            });
            return;
        }

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