import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { DisplaySectionProps } from '../types/construction-display';

export const DisplaySection = ({
    title,
    description,
    icon: Icon,
    children,
}: DisplaySectionProps) => {
    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                    {title}
                </CardTitle>
                <CardDescription className="text-sm">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">{children}</CardContent>
        </Card>
    );
};
