import {
    JSX
} from "solid-js";

import { Book } from "../../../interfaces/book.interfaces";

import style from './book-card.module.scss'

export default (props: { book: Book, onClick: () => void }): JSX.Element => {

    return <>
        <div
            onClick={props.onClick}
            class={`book-card ${style['book-card']}`}
        >
            <h3 class={'title'}>{props.book.title}</h3>
            <div class={'author-wrapper'}>
                <p class={'author'}>{props.book.authorName}</p>
                <p class={'category'}>{props.book.categoryName}</p>
            </div>
        </div>
    </>
}