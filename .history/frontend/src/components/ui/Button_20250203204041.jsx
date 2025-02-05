import React from 'react';
import { Button } from "@/components/ui/button";

const CustomButton = ({ children, onClick, variant = "default" }) => {
    return <Button variant={variant} onClick={onClick}>{children}</Button>;
};

export default CustomButton;
