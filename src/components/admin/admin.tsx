import {
    JSX
} from "solid-js";
import AuthorEdit from "./actions/author-edit";
import CategoryEdit from "./actions/category-edit";
import UserEdit from "./actions/user-edit";

export default (): JSX.Element => {
    return<>
        <AuthorEdit></AuthorEdit>
        <CategoryEdit></CategoryEdit>
        <UserEdit></UserEdit>
    </>
};