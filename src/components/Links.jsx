import {Link} from 'react-router-dom';
const Links = ({to, className, text}) => <Link to={to} className={className}>{text}</Link>
export default Links