import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

export default function useActions(actions, deps){
    const dispathch = useDispatch();
    return useMemo(
        () => {
            if(Array.isArray(actions)){
                return actions.map(a => bindActionCreators(a, dispathch));
            }
            return bindActionCreators(actions, dispathch);
        },
        deps ? [dispathch, ...deps] : deps
    )
}