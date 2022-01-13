import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import {AiFillHome,AiOutlineUser, AiFillSetting } from 'react-icons/ai';
import {IoExitOutline} from 'react-icons/io5';

export default function Header(){
  const { user, signOut} = useContext(AuthContext);

  return(
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
      </div>

        <Link className="order" to="/dashboard">
          <AiFillHome color="#FFF"  />
        </Link>

        <Link  className="order" to="/customers">
          <AiOutlineUser color="#FFF"  />
        </Link>

        <Link className="order" to="/profile" >
          <AiFillSetting color="#FFF" />
        </Link> 

      <div className="buttonExit">
        
        <button onClick={() => signOut()}><IoExitOutline color="#FFF"  /></button>

      </div>

    </div>
  )
}