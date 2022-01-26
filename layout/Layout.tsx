interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
    return <div className='app'>{children}</div>;
};

export default Layout;
