import NavStyle from "./Nav.css"
function Nav() {
    return ( 
    <nav className={`navbar  ${NavStyle.navbar}`}>
        <div className="container-fluid">
            <div className="navbar-brand">
               <h1 className="mb-4"><img src="./icon/logo.jpg" alt="" width="30" height="25" className="d-inline-block align-text-middle" 
               style={{marginRight:"5px",width:"40px",height:"40px"}} />Greendzine Technologies</h1>
            </div>
        </div>
  </nav> );
}

export default Nav;