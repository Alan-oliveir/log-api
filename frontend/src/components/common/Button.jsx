export const Button = ({
                           children,
                           variant = 'primary',
                           size = 'md',
                           disabled = false,
                           icon: Icon,
                           ...props
                       }) => {
    const baseClasses = 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`;

    return (
        <button className={classes} disabled={disabled} {...props}>
            <div className="flex items-center space-x-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span>{children}</span>
            </div>
        </button>
    );
};
