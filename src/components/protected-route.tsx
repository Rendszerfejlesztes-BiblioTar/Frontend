import { JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default (props: {privilege: number, reqPrivilege: number, children: JSX.Element, defPath: string}): JSX.Element => {

    if (props.privilege <= props.reqPrivilege) {
        return props.children;
    } else {
        const navigate = useNavigate();

        navigate(props.defPath);
    }
}