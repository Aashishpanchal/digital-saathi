import React from "react";
import ImageInput from "../../../../components/form/inputs/ImageInput";
import { categories } from "../../../../http";
export default function useFormCategories() {
    const [categoriesOptions, setCategoriesOptions] = React.useState({
        "0": "None",
    });
    const onRetrieveCategory = async () => {
        try {
            const res = await categories("get");
            if (res?.status === 200) {
                const { categories } = res.data;
                if (categories) {
                    let options = {};
                    categories.map((item) => {
                        options[item?.category_id?.toString()] = item?.name;
                    });
                    setCategoriesOptions({
                        ...categoriesOptions,
                        ...options,
                    });
                }
            }
        }
        catch (err) {
            console.log(err.response);
        }
    };
    const getFormsFields = React.useMemo(() => [
        {
            type: "string",
            label: "Category Name",
            name: "name",
            defaultValue: "",
            validate: true,
            hintText: "Category Name is compulsory",
        },
        {
            type: "select",
            label: "Parent Category",
            name: "parent_category_id",
            options: categoriesOptions,
            defaultValue: "0",
        },
        {
            label: "Drag & Drop Files But Image size should be square (500) x (500).",
            name: "image",
            defaultValue: null,
            Field: (props) => {
                return (<ImageInput label={props.label} handleChange={(file) => {
                        props.setData({ ...props.data, image: file });
                    }} file={props.data.image} imageMiddleUri="category-images"/>);
            },
        },
        {
            type: "textarea",
            label: "Description",
            name: "description",
            defaultValue: "",
        },
    ], [categoriesOptions]);
    React.useEffect(() => {
        onRetrieveCategory();
    }, []);
    return { getFormsFields };
}
