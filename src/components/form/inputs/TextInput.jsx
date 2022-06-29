import React from "react";
export default function TextInput(props) {
    const random = Math.random().toString(36).substring(7);
    const id = `${props.type}-${random}`;
    return (<div>
      <label className="block text-sm text-gray-800 dark:text-gray-200" htmlFor={id}>
        {props.label}
      </label>
      <div className="flex flex-nowrap items-baseline">
        <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" id={id} placeholder={props.placeholder} type={props.type} autoComplete={props.autoComplete} name={props.name} value={props.value} onChange={props.onChange}/>
      </div>
      {props.hint && (<div className={`${props.hintColor === "green" ? "text-green-600" : "text-red-600"} text-sm mt-2`}>
          {props.hint}
        </div>)}
    </div>);
}
