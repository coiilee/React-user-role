import React from "react";

const FormInput = ({id,label,placeholder}) => {
    return (
        <div className="form-floating mb-3">
            <input className="form-control"
                   id={id}
                   type="text"
                   placeholder={placeholder}
                   data-sb-validations="required"/>
            <label htmlFor={id}>{label}</label>
            <div className="invalid-feedback" data-sb-feedback={`${id}:required`}>
                {label}은(는) 필수 입력
            </div>

        </div>
    )

};

export default FormInput;