const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <div className="footer">
            <div className="footer-contents">
                <p>Copyright &copy; {year} FAITH</p>
                <p>All Rights Reserved.</p>
            </div>
        </div>
    )
}
export default Footer