import { Dispatch, SetStateAction } from "react"

export const checkEmptyInputs = (
    inputs: Object,
    setError: Dispatch<SetStateAction<string>>
) => {
    const inputValues = Object.values(inputs);
    const emptyInputs = inputValues.filter(input => input === "");
    if (emptyInputs.length > 0) {
        setError("Not all information is filled out.");
        return false;
    } else {
        return true;
    }
}