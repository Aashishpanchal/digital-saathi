import React from "react";
export default function useValidation(fields) {
    const [isValid, setIsValid] = React.useState(false);
    const [validFields, setValidFields] = React.useState(null);
    const checkValidate = (data) => {
        fields.forEach((field) => {
            if (data[field] === "") {
                setIsValid(false);
            }
        });
    };
    React.useEffect(() => {
        if (fields) {
            const defaultValidFields = {};
            fields.forEach((field) => {
                defaultValidFields[field] = true;
            });
            setValidFields(defaultValidFields);
        }
    }, []);
    return { isValid, validFields, checkValidate };
}
