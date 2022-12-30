/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ImageUpInputValues = {
    Field0?: string;
    Field1?: string;
};
export declare type ImageUpValidationValues = {
    Field0?: ValidationFunction<string>;
    Field1?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImageUpOverridesProps = {
    ImageUpGrid?: FormProps<GridProps>;
    Field0?: FormProps<TextFieldProps>;
    Field1?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImageUpProps = React.PropsWithChildren<{
    overrides?: ImageUpOverridesProps | undefined | null;
} & {
    onSubmit: (fields: ImageUpInputValues) => void;
    onCancel?: () => void;
    onChange?: (fields: ImageUpInputValues) => ImageUpInputValues;
    onValidate?: ImageUpValidationValues;
} & React.CSSProperties>;
export default function ImageUp(props: ImageUpProps): React.ReactElement;
