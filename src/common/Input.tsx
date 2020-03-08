import * as React from "react";

interface Props {
    type: string;
    name: string;
    onChange: (e: any) => void;
    placeholder?: string;
    value?: string;
    checked?: boolean;
    isValid: boolean;
    isDisabled: boolean;
}

export class Input extends React.Component<Props> {
    render() {
        const { type, isDisabled, isValid } = this.props;
        const classNames = [type !== "radio" ? "text-input" : "radio"];
        if (isDisabled) {
            classNames.push("disabled");
        }

        const wrapperClasses = ["input-wrapper"];
        if (type !== "radio") {
            wrapperClasses.push("border");

            if (!isValid) {
                wrapperClasses.push("invalid");
                classNames.push("invalid-input");
            }
        }

        return (
            <div className={wrapperClasses.join(" ")}>
                <input
                    {...this.props}
                    disabled={isDisabled}
                    className={classNames.join(" ")}
                />
            </div>
        );
    }
}
