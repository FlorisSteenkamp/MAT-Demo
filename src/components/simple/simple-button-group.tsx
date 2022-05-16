import * as React from 'react';


interface Props<T extends string> {
    readonly options: { [K in T]?: { text: string } };
    readonly value: T;
    readonly onChanged?: (key: T) => void;
}


function ButtonGroup<T extends string>(props: Props<T>) {
    const { options, onChanged } = props;
    const idStr = Math.random().toString();

    function onClick(key: T) {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (!onChanged) { return; } 
            onChanged(key);
        }
    }

    return (
        <div className='btn-group'>
            {Object.entries(options).map(option => {
                let key = option[0] as T;
                let value = option[1] as { text: string };
                return <button key={key} onClick={onClick(key)}>{value.text}</button>
            })}
        </div>
    );
}


export { ButtonGroup }
    