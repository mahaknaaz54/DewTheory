const Container = ({ children, className = '' }) => {
    return (
        <div className={`max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-24 w-full ${className}`}>
            {children}
        </div>
    );
};

export default Container;
