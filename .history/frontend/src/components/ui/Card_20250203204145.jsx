import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CustomCard = ({ children }) => {
    return (
        <Card>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CustomCard;
