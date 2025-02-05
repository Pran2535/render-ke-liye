import React from 'react';
import { Input } from "@/components/ui/input";

const CustomInput = ({ type = "text", placeholder, value, onChange }) => {
    return <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default CustomInput;