interface TableToolbarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function TableToolbar({
    value,
    onChange,
    placeholder = 'Search...'
}: TableToolbarProps) {

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <input
                className="w-72 rounded-lg border px-3 py-2"
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
            />
        </div>
    );
}